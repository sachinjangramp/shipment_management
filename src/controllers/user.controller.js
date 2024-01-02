const db = require('../config/db.config').promise();
const logger = require('./../utils/logger');

const createUser = async (req, res) => {
    const { first_name, last_name, username, password, contact_no, role_id } = req.body;

    const salt = await require('bcrypt').genSalt(10);
    const hashedPassword = await require('bcrypt').hash(password, salt)

    const columns = ['first_name', 'last_name', 'username', 'password'];
    const values = [first_name, last_name, username, hashedPassword];

    if (role_id !== undefined) {
        columns.push('role_id');
        values.push(role_id);
    }


    if (contact_no !== undefined) {
        columns.push('contact_no');
        values.push(contact_no);
    }

    const query = `INSERT INTO users (${columns.join(', ')}) VALUES (${values.map(() => '?').join(', ')})`;

    try {
        const [rows] = await db.query(query, values);
        logger.info('User created successfully userId: ' + rows.insertId);
        res.status(201).json({ message: 'User created successfully', userId: rows.insertId });
    } catch (error) {
        console.error(error);
        logger.error(error);
        if (error.code === 'ER_DUP_ENTRY') {
            logger.error('Duplicate entry. Please choose a different username or contact number.');
            res.status(400).json({ error: 'Duplicate entry. Please choose a different username or contact number.' });
        } else {
            logger.error('Internal Server Error');
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
};


const getAllUsers = async (req, res) => {
    const query = 'SELECT * FROM users';

    try {
        const [rows] = await db.query(query);
        res.status(200).json({ users: rows });
    } catch (error) {
        logger.error(error);
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const deleteUser = async (req, res) => {
    const userId = req.body.id;

    if (!userId) {
        logger.error('User ID is required in the request body');
        return res.status(400).json({ error: 'User ID is required in the request body' });
    }

    const query = 'DELETE FROM users WHERE user_id = ?';

    try {
        const [rows] = await db.query(query, [userId]);

        if (rows.affectedRows === 0) {
            logger.info('User not found');
            res.status(404).json({ error: 'User not found' });
        } else {
            logger.info('User deleted successfully');
            res.status(200).json({ message: 'User deleted successfully' });
        }
    } catch (error) {
        console.error(error);
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateUser = async (req, res) => {
    const { id, first_name, last_name, username, password, contact_no, role_id } = req.body;

    if (!id) {
        logger.error('User ID is required in the request body');
        return res.status(400).json({ error: 'User ID is required in the request body' });
    }

    const columns = [];
    const values = [];

    if (first_name !== undefined) {
        columns.push('first_name = ?');
        values.push(first_name);
    }
    if (last_name !== undefined) {
        columns.push('last_name = ?');
        values.push(last_name);
    }
    if (username !== undefined) {
        columns.push('username = ?');
        values.push(username);
    }
    if (password !== undefined) {
        const salt = await require('bcrypt').genSalt(10);
        const hashedPassword = await require('bcrypt').hash(password, salt);
        columns.push('password = ?');
        values.push(hashedPassword);
    }
    if (contact_no !== undefined) {
        columns.push('contact_no = ?');
        values.push(contact_no);
    }
    if (role_id !== undefined) {
        columns.push('role_id = ?');
        values.push(role_id);
    }

    if (columns.length === 0) {
        logger.error('No fields to update');
        return res.status(400).json({ error: 'No fields to update' });
    }

    const updateQuery = `UPDATE users SET ${columns.join(', ')} WHERE user_id = ?`;

    try {
        const [rows] = await db.query(updateQuery, [...values, id]);

        if (rows.affectedRows === 0) {
            logger.error('User not found');
            res.status(404).json({ error: 'User not found' });
        } else {
            logger.info('User updated successfully');
            res.status(200).json({ message: 'User updated successfully' });
        }
    } catch (error) {
        console.error(error);
        logger.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};





module.exports = { createUser, deleteUser, updateUser, getAllUsers };
