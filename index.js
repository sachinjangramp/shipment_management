const server = require('./src/app');
require('dotenv').config()


server.listen(process.env.PORT, () => {
    console.log(`Server is Running on Port: ${process.env.PORT}`)
})