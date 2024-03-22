const swaggerAutogen = require("swagger-autogen")();

const doc = {
    info: {
        title: "Vehicles API",
        description: "Vehicles API"
    },
    host: "cse341-project-2-g6df.onrender.com",
    schemes: ["https"]
    // host: "localhost:3000",
    // schemes: ["http"]
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);
