const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Dev Tinder API",
    description: "API documentation",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"]; // 👈 scan routes here

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require("./app"); // start server after generation
});
