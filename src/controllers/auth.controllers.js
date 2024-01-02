const db = require('../config/db.config').promise();
const jwt = require('jsonwebtoken');
const logger = require('./../utils/logger');

const updateAuthToken = async (id, token) => {
    try {
        const [rows] = await db.query(`UPDATE users SET auth_token = ? WHERE user_id = ?`, [token, id])

    } catch (error) {
        console.error(error);
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    };
}

const signIn = async (req, res) => {

    const { username, password } = req.body;

    const query = `SELECT * FROM users WHERE username = ?`;
    try {
        const [rows] = await db.query(query, [username]);

        if (rows.length === 0) {
            logger.error('User Not Available');
            res.status(404).json({ error: 'User Not Available' });
        } else {

            const storedHashedPassword = rows[0].password;

            const isPasswordMatch = await require('bcrypt').compare(password, storedHashedPassword);

            if (!isPasswordMatch) {
                logger.error("Wrong Password");
                return res.status(401).json({ message: "Wrong Password" })
            }
            else {
                const token = jwt.sign({ id: rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

                updateAuthToken(rows[0].user_id, token);
                res.set({ token: `Bearer  ${token}` })
                logger.info("Successfully Logged In");
                return res.status(200).json({ message: "Successfully Logged In" })
            }

        }
    } catch (error) {
        console.error(error);
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}



module.exports = { signIn }