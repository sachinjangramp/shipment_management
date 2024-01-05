const app = require('express')();
app.use(require('express').json())






//Router as Middleware
/**
 * @openapi
 * /user:
 *   get:
 *      tags:
 *          - adminroutes
 *      summary: Get all users
 *      description: Get a list of all users
 *      responses:
 *        '200':
 *          description: App is up and running
 *   post:
 *      tags:
 *          - adminroutes
 *      summary: Create a new user
 *      description: Create a new user
 *      responses:
 *        '200':
 *          description: App is up and running
 *   delete:
 *      tags:
 *          - adminroutes
 *      summary: Delete a user
 *      description: Delete a user
 *      responses:
 *        '200':
 *          description: App is up and running
 *   patch:
 *      tags:
 *          - adminroutes
 *      summary: Update a user
 *      description: Update a user
 *      responses:
 *        '200':
 *          description: App is up and running
 */





app.use(require('./routes/admin.routes'));
app.use(require('./routes/auth.routes'))
app.use(require('./routes/shipment.route'))







//swagger-ui setup
const swaggerDocs = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
const swaggerSpecs = swaggerDocs(require('./config/swagger.config'))
app.use(swaggerUi.serve, swaggerUi.setup(swaggerSpecs))


module.exports = app