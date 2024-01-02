const swaggerOptions = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Shipment Management - Api Documentation",
            version: "1.0.0",
            description: "A sample API documentation"
        },
        servers: [
            {
                description: "Main",
                url: `http://localhost:5002`
            }
        ]
    },
    apis: ["./src/routes/*.js"]
};

module.exports = swaggerOptions;
