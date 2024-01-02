const router = require('express').Router()


const { signIn } = require('../controllers/auth.controllers');



/**
 * @swagger
 * /signin:
 *   post:
 *      tags:
 *          - auth
 *      summary: Sign In
 *      description: Sign In to an existing User; it will give you an auth token in the response header
 *      requestBody:
 *        description: Authentication details
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                username:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        '200':
 *          description: Success
 *          content:
 *            application/json:
 *              example:
 *                  message: Successfully Logged In
 */



router.post('/signin', signIn);



module.exports = router;