const express = require("express");
require("dotenv").config();
const cors = require("cors");

const connectDb = require("./config/dbConfig");
const router = require("./routes/routes");
const taskrouter = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT;
connectDb().then(() =>
  app.listen(PORT, () => console.log("Server running in port " + PORT))
);

app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use("/users", router);
app.use("/tasks", taskrouter);
