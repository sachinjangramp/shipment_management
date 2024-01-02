'use strict';
const { Shipments, Status } = require('../models/model');
const dbConn = require('../config/db.config')
const logger = require('./../utils/logger');
exports.findAll = function (req, res) {
    Shipments.findAll(function (err, shipment) {
        console.log('controller');
        logger.info('controller');
        if (err) {
            logger.error(err);
            res.send(err);
        }
        logger.info('All available shipments sent in the response.')
        console.log('res', shipment);
        res.send(shipment);
    });
};
exports.create = function (req, res) {
    const new_shipment = new Shipments(req.body);

    // Handles null error
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        logger.error('Please provide all required fields');
        res.status(400).send({ error: true, message: 'Please provide all required fields' });
    } else {
        // Use the model method to create the shipment
        Shipments.create(new_shipment, function (err, shipment) {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    logger.error('Duplicate entry for tracking number');
                    res.status(400).send({ error: true, message: 'Duplicate entry for tracking number' });
                } else {
                    logger.error('Internal Server Error');
                    res.status(500).send({ error: true, message: 'Internal Server Error' });
                }
            } else {
                logger.info("Shipment added successfully!");
                res.json({ error: false, message: "Shipment added successfully!" });
            }
        });
    }
};
exports.findById = function (req, res) {
    Shipments.findById(req.params.id, function (err, shipment) {
        if (err) {
            logger.error(err);
            res.send(err);
        }
        logger.info('shipment sent in the response.')
        res.json(shipment);
    });
};
exports.update = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        logger.error('Please provide all required field');
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Shipments.update(req.params.id, new Shipments(req.body), function (err, shipment) {
            if (err) {
                logger.error(error);
                res.send(err);
            }
            logger.info('Shipment successfully updated');
            res.json({ error: false, message: 'Shipment successfully updated' });
        });
    }
};
exports.delete = function (req, res) {
    Shipments.delete(req.params.id, function (err, shipment) {
        if (err) {
            logger.error(err);
            res.send(err);
        }
        logger.info('Shipment successfully deleted');
        res.json({ error: false, message: 'Shipment successfully deleted' });
    });
};

exports.statusUpdate = function (req, res) {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        logger.error('Please provide all required field');
        res.status(400).send({ error: true, message: 'Please provide all required field' });
    } else {
        Status.statusUpdate(req.params.id, new Status(req.body), function (err, shipment) {
            if (err) {
                logger.error(err);
                res.send(err);
            }
            logger.info('Status successfully updated');
            res.json({ error: false, message: 'Status successfully updated' });
            let text = `Status has been updated: Location-${req.body.status_location}, Decription-${req.body.status_description} ${result}`;
            let email = 'sachinjangrapm@gmail.com';
            require('../utils/email')(email, text);

        });
    }
};

exports.search = function (req, res) {
    const {
        tracking_number,
        receiver_info,
        carrier,
        status_location,
        status_description,
        sender_id,
        page,
        pageSize,
    } = req.body;
    const offset = (page - 1) * pageSize || 0;

    let sql = 'SELECT * FROM shipments WHERE 1';
    const params = [];

    if (tracking_number) {
        sql += ' AND tracking_number = ?';
        params.push(tracking_number);
    }

    if (receiver_info) {
        sql += ' AND receiver_info = ?';
        params.push(receiver_info);
    }

    if (carrier) {
        sql += ' AND carrier = ?';
        params.push(carrier);
    }

    if (status_location) {
        sql += ' AND status_location = ?';
        params.push(status_location);
    }

    if (status_description) {
        sql += ' AND status_description = ?';
        params.push(status_description);
    }

    if (sender_id) {
        sql += ' AND sender_id = ?';
        params.push(sender_id);
    }

    sql += ' LIMIT ? OFFSET ?';
    params.push(parseInt(pageSize, 10), offset);

    dbConn.query(sql, params, (err, results) => {
        if (err) {
            logger.error('Error executing MySQL query:' + err);
            console.error('Error executing MySQL query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(results);
            logger.info('search successful');
        }
    });
};