const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Vehicles API",
        description: "Vehicles API"
    },
    host: "localhost:3000",
    schemes: ["http", "https"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);