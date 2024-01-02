const controller = require('../controllers/shipments.controller');
const { verifyRole } = require('../middlewares/user.verify')

const router = require('express').Router()

/**
 * @swagger
 * /shipments:
 *   get:
 *      tags:
 *          - shipment
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *      summary: Get All Shipments
 *      description: Get All Shipments - Accessible Roles (ADMIN)
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              example:
 *                id: "1"
 *                tracking_number: "ABC123"
 *                receiver_info:
 *                  name: "John Doe"
 *                  address: "123 Main St, City"
 *                carrier: "FedEx"
 *                status_location: "Transit City"
 *                status_updated_timestamp: "2023-12-31T11:25:19.000Z"
 *                status_description: "Package is on its way to the destination"
 *                sender_id: 123
 *
 *
 *                
 */



router.get('/shipments', verifyRole(['user', 'admin', 'super', 'dev']), controller.findAll);



/**
 * @swagger
 * /shipments:
 *   post:
 *      tags:
 *          - shipment
 *      parameters:
 *        - name: token
 *          in: header
 *          description: Auth token for authentication
 *          required: true
 *      requestBody:
 *        description: shipment details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                tracking_number:
 *                  type: string
 *                receiver_info:
 *                  type: string
 *                status_location:
 *                   type:string
 *                status_description:
 *                   type:string
 *                carrier:
 *                   type:string
 *                sender_id:
 *                   type:int
 *      summary: Create New Shipment
 *      description: Create New Shipment - Accessible Roles (USER/ADMIN)
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              example:
 *                error: false
 *                message: "Shipment added successfully!"
 *
 */

router.post('/shipments', verifyRole(['user', 'admin', 'super', 'dev']), controller.create);





// Retrieve a single employee with id

/**
 * @swagger
 * /shipments/{id}:
 *   get:
 *      tags:
 *          - shipment
 *      parameters:
 *        - name: token
 *          in: header
 *          description: Access Token for Authentication
 *          required: true
 *        - name: id
 *          in: path
 *          required: true
 *      summary: Get Shipments by id
 *      description: Get Shipments by id - Accessible Roles (ADMIN)
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              example:
 *                id: "1"
 *                tracking_number: "ABC123"
 *                receiver_info:
 *                  name: "John Doe"
 *                  address: "123 Main St, City"
 *                carrier: "FedEx"
 *                status_location: "Transit City"
 *                status_updated_timestamp: "2023-12-31T11:25:19.000Z"
 *                status_description: "Package is on its way to the destination"
 *                sender_id: 123
 *
 *
 *                
 */



router.get('/shipments/:id', verifyRole(['user', 'admin', 'super', 'dev']), controller.findById);



// Update a employee with id

/**
 * @swagger
 * /shipments/{id}:
 *   put:
 *      tags:
 *          - shipment
 *      parameters:
 *        - name: token
 *          in: header
 *          description: Auth Token for authentication
 *          required: true
 *        - name: id
 *          in: path
 *          required: true
 *      requestBody:
 *        description: shipment details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                tracking_number:
 *                  type: string
 *                receiver_info:
 *                  type: string
 *                status_location:
 *                   type:string
 *                status_description:
 *                   type:string
 *                carrier:
 *                   type:string
 *                sender_id:
 *                   type:int
 *      summary: Update Shipment
 *      description: Update Shipment - Accessible Roles (ADMIN)
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              example:
 *                error: false
 *                message: "Shipment updated successfully!"
 *
 */

router.put('/shipments/:id', verifyRole(['admin', 'super', 'dev']), controller.update);
// Delete a employee with id


/**
 * @swagger
 * /shipments/{id}:
 *   delete:
 *      tags:
 *          - shipment
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          description: Access Token for Authentication
 *        - name: id
 *          in: path
 *          required: true
 *      summary: Delete Shipment
 *      description: Delete Shipment by id - Accessible Roles (ADMIN)
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              example:
 *                error: false
 *                message: "Shipment deleted successfully!"
 *
 *                
 */




router.delete('/shipments/:id', verifyRole(['admin', 'super', 'dev']), controller.delete);

/**
 * @swagger
 * /shipments/statusupdate/{id}:
 *   patch:
 *      tags:
 *          - shipment
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          description: Access Token for Authentication
 *        - name: id
 *          in: path
 *          required: true
 *      requestBody:
 *        description: shipment details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                tracking_number:
 *                  type: string
 *                receiver_info:
 *                  type: string
 *                status_location:
 *                   type:string
 *                status_description:
 *                   type:string
 *                carrier:
 *                   type:string
 *                sender_id:
 *                   type:int
 *      summary: Update Shipment Status
 *      description: Update Shipment Status - Accessible Roles (ADMIN)
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              example:
 *                error: false
 *                message: "Status successfully updated!"
 *
 *                
 */

router.patch('shipments/statusupdate/:id', verifyRole(['admin', 'super', 'dev']), controller.statusUpdate);



/**
 * @swagger
 * /shipments/search:
 *   post:
 *      tags:
 *          - shipment
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *      requestBody:
 *        description: Search and fiter -  Page Size is Mandoratory and rest of keys are for search or filter
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                pageSize:
 *                  type: integer
 *                  default: 100
 *                page:
 *                  type: integer
 *                  default: 1
 *                tracking_number:
 *                   type: string
 *                receiver_info:
 *                   type: string
 *                carrier:
 *                   type: string
 *                status_location:
 *                   type: string
 *                status_description:
 *                   type: string
 *                sender_id:
 *                   type: integer
 *                
 *      summary: Search and Filter
 *      description: Search or Fileter Shipments - Accessible Roles (USER/ADMIN)
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              example:
 *                id: "1"
 *                tracking_number: "ABC123"
 *                receiver_info:
 *                  name: "John Doe"
 *                  address: "123 Main St, City"
 *                carrier: "FedEx"
 *                status_location: "Transit City"
 *                status_updated_timestamp: "2023-12-31T11:25:19.000Z"
 *                status_description: "Package is on its way to the destination"
 *                sender_id: 123
 */


router.post('/shipments/search', controller.search);


module.exports = router;