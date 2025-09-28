const express = require("express");
const { connectDB } = require("./config/database");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestsRouter = require("./routes/requests");  
const swaggerUi = require("swagger-ui-express");
const swaggerDoc = require("./swagger-output.json");


const app = express();

connectDB()
  .then((val) => {
    console.log("DB Connected Succesfully");
    app.listen(3000, () => {
      console.log("LISTENING TO PORT 3000");
    });
  })
  .catch((e) => {
    console.log(e, "DB Error Occured");
  });

app.use(express.json());
app.use(cookieParser());
// Swagger UI endpoint
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use("/api/auth", authRouter);
app.use("/api/user", profileRouter);
app.use("/api/requests", requestsRouter);



app.get("/", (req, res) => {
  res.send("Welcome to Dev tinder backend!");
});

app.get("/error", (req, res, next) => {
  try {
    throw new Error("Error Occured by error API!");
  } catch (e) {
    next(e);
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack); // Log for debugging

  res.status(500).json({
    status: "error",
    message: err.message || "Internal Server Error",
  });
});
