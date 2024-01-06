const router = require('express').Router()

const { createUser, deleteUser, updateUser, getAllUsers } = require('../controllers/user.controller')
const { verifyRole } = require('../middlewares/user.verify')
const getLogs = require('../controllers/logs.controller')


//Protected Route



/**
 * @openapi
 * /user:
 *   get:
 *
 *      tags:
 *          - User
 *      parameters:
 *        - name: token
 *          in: header
 *          description: Auth token for authorization
 *          required: true
 *      summary: Get all users
 *      description: Get a list of all users - Accessible Roles (Admin)
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *              application/json:
 *                  example:
 *                      user_id: 1
 *                      first_name: John
 *                      last_name: Smith
 *                      contact_no: 9999999999
 *                      username: johnsmith
 *                      password: "#hash"
 *                      auth_token: "#hash"
 *                      role_id: 2
 *   post:
 *      
 *      tags:
 *          - User
 *      summary: Create a new user
 *      description: Create a new user
 *      parameters:
 *        - name: token
 *          in: header
 *          required: true
 *          description: Auth token for authorization
 *      requestBody:
 *          description: Enter user details
 *          required: true
 *          content:
 *              application/json:
 * 
 *                   schema:
 *                     type: object
 *                     properties:
 *                       first_name:
 *                           type: string
 *                           required: true
 *                       last_name: 
 *                           type: string
 *                       contact_no: 
 *                           type: integer
 *                       username: 
 *                           type: string
 *                           required: true
 *                       password: 
 *                           type: string
 *                           required: true
 *                       role_id:
 *                           type: integer
 *                           default: 2
 *                           required: true
 *
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *              application/json:
 *                  example:
 *                      message: "User created successfully"
 *   delete:
 *      
 *      tags:
 *          - User
 *      summary: Delete a user
 *      description: Delete a user
 *      parameters:
 *        - name: token
 *          in: header
 *          description: Auth token for authorization
 *          required: true
 *      requestBody:
 *          description: id of user to delete
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          id: 
 *                              type: integer
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *              application/json:
 *                  example:
 *                      message: "User Deleted successfully"
 *   patch:
 *      
 *      tags:
 *          - User
 *      summary: Update a user
 *      description: Update a user
 *      parameters:
 *        - name: token
 *          in: header
 *          description: Auth token for authentication
 *          required: true
 *      requestBody:
 *          description: Enter user details
 *          required: true
 *          content:
 *              application/json:
 * 
 *                   schema:
 *                     type: object
 *                     properties:
 *                       id:
 *                           type: integer
 *                       first_name:
 *                           type: string
 *                           required: true
 *                       last_name: 
 *                           type: string
 *                       contact_no: 
 *                           type: integer
 *                       username: 
 *                           type: string
 *                           required: true
 *                       password: 
 *                           type: string
 *                           required: true
 *                       role_id:
 *                           type: integer
 *                           default: 2
 *                           required: true
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *              application/json:
 *                  example:
 *                      message: "User updated successfully"
 */


router.get('/user', verifyRole(['ADMIN', 'DEV', 'SUPER']), getAllUsers);
router.post('/user', verifyRole(['ADMIN', 'DEV', 'SUPER']), createUser);
router.delete('/user', verifyRole(['ADMIN', 'DEV', 'SUPER']), deleteUser);
router.patch('/user', verifyRole(['ADMIN', 'DEV', 'SUPER']), updateUser);

router.get('/logs', verifyRole(['ADMIN', 'DEV', 'SUPER']), getLogs);





module.exports = router;