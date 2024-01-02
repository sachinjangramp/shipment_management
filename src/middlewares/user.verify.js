const db = require('../config/db.config').promise();
const logger = require('./../utils/logger');

const getUserId = async (req, res, next) => {
    console.log('Entered to check user');
    const token = req.headers['token'];
    if (!token) {
        res.status(401).send('Token not provided');
        logger.error('Token not provided');
        return; // Terminate the middleware here
    }

    require('jsonwebtoken').verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).send('Invalid token');
            logger.error('Invalid token');
            return; // Terminate the middleware here
        }
        console.log(user);
        req.user = user;
        next();
    });
};


const verifyRole = (requiredRoles) => async (req, res, next) => {
    const token = req.headers['token'];
    if (!token) {
        res.status(401).send('Token not provided');
        logger.error('Token not provided');
        return; // Terminate the middleware here
    }

    require('jsonwebtoken').verify(token, process.env.JWT_SECRET, async (err, user) => {
        if (err) {
            res.status(403).send('Invalid token');
            logger.error('Invalid token');
            return;
        } else {
            try {
                const [rows] = await db.query(`SELECT role_id FROM users WHERE user_id = ?`, [user.id]);
                req.user_role_id = rows[0].role_id;
                console.log(rows);

                const [role] = await db.query(`SELECT role_name FROM user_roles WHERE role_id = ?`, [req.user_role_id]);

                const userRole = role[0].role_name.toUpperCase();
                if (!requiredRoles.map(role => role.toUpperCase()).includes(userRole)) {
                    logger.error('You are not authorized to perform this operation');
                    return res.status(403).send('You are not authorized to perform this operation');
                }

                next();
            } catch (error) {
                console.error('Error querying the database:', error);
                logger.error('Error querying the database:', error);
                res.status(500).send('Internal Server Error');
            }
        }
    });
};

module.exports = { getUserId, verifyRole };
