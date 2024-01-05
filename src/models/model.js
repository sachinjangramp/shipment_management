'use strict';
var dbConn = require('./../config/db.config');

//Employee object create
var Shipments = function (shipments) {
    this.tracking_number = shipments.tracking_number
    this.receiver_info = shipments.receiver_info
    this.carrier = shipments.carrier
    this.status_location = shipments.status_location
    this.status_description = shipments.status_description
    this.sender_id = shipments.sender_id
};
var Status = function (shipments) {
    this.status_location = shipments.status_location
    this.status_description = shipments.status_description
};

Shipments.create = function (newShipment, result) {
    dbConn.query("INSERT INTO shipments set ?", newShipment, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            console.log(res.insertId);
            result(null, res.insertId);
        }
    });
};
Shipments.findById = function (id, result) {
    dbConn.query("Select * from shipments where id = ? ", id, function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(err, null);
        }
        else {
            result(null, res);
        }
    });
};
Shipments.findAll = function (result) {
    dbConn.query("Select * from shipments", function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            console.log('shipments : ', res);
            result(null, res);
        }
    });
};
Shipments.update = function (id, shipments, result) {
    dbConn.query("UPDATE shipments SET tracking_number=?,receiver_info=?,carrier=?,status_location=?,status_description=?,sender_id=? WHERE id = ?", [shipments.tracking_number, shipments.receiver_info, shipments.carrier, shipments.status_location, shipments.status_description, shipments.sender_id, id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            result(null, res);
        }
    });
};
Shipments.delete = function (id, result) {
    dbConn.query("DELETE FROM shipments WHERE id = ?", [id], function (err, res) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        }
        else {
            result(null, res);
        }
    });
};
Status.statusUpdate = function (id, status, result) {
    dbConn.query("UPDATE shipments SET status_location=?,status_description=? WHERE id = ?", [status.status_location, status.status_description, id], function (err, updateResult) {
        if (err) {
            console.log("error: ", err);
            result(null, err);
        } else {
            dbConn.query(
                "SELECT sender_id FROM shipments WHERE id = ?",
                [id],
                function (selectErr, selectResult) {
                    if (selectErr) {
                        console.log("Select error: ", selectErr);
                        result(null, selectErr);
                    } else {
                        const updatedRow = updateResult;
                        const user_id = selectResult[0] ? selectResult[0].sender_id : null;
                        dbConn.query(
                            "SELECT user_email FROM users WHERE user_id = ?",
                            [user_id],
                            function (selectErr, selectResult) {
                                if (selectErr) {
                                    console.log("Select error: ", selectErr);
                                    result(null, selectErr);
                                } else {
                                    const user_email = selectResult[0] ? selectResult[0].user_email : null;                                  
                                    console.log("Updated row:", updatedRow);
                                    console.log("User Email:", user_email);
                                    result(null, user_email);                                   
                                }
                            }
                        );                
                    }
                }
            );
        }
    });
};

module.exports = { Shipments, Status };