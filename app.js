//external imoprts
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const chalk = require('chalk');

//internal imports
const postRouter = require("./Routers/postRouter");
const authRouter = require("./Routers/authRouter");
const dashboardRouter = require('./Routers/dashboardRouter');
const uploadsRouter = require('./Routers/uploadsRouter')
const app = express();
dotenv.config();

//Database Connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connection successful"))
  .catch((err) => console.log(err));

//request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set static folder
app.use(express.static(path.join(__dirname, "public")));

//Routing setup
app.use("/auth", authRouter);
app.use("/dashboard", dashboardRouter);
app.use("/uploads", uploadsRouter);
app.use("/post", postRouter);
app.use("/", (req, res) => {
    res.send("Home Page");
});

//defaul error handler

const errorHandler = (err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was an upload error");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("Successful");
  }
};

app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(chalk.bgGreen.black(`Server is listening at http://localhost:${process.env.PORT}`));
});
