const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Vehicles API",
        description: "Vehicles API"
    },
    host: "cse341-project-2.oOmg.onrender.com",
    schemes: ["https"]
};

const outputFile = "../swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);