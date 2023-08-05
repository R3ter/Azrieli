const express = require("express");
const app = express();
const cors = require("cors");

// DB connections:
require("./configs/database");

// Middleware
app.use(express.json());
app.use(cors());

const authController = require("./Controllers/authController");
const authdigits = require("./Controllers/authdigits");

const MoviesRouter = require("./Routers/MoviesRouter");
const UsersRouter = require("./Routers/UsersRouter");

app.use("/api/Auth", authController);
app.use("/api/Auth", authdigits);

app.use("/api/Users", UsersRouter);
app.use("/api/Movies", MoviesRouter);

const port = 8000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
