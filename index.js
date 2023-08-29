const express = require("express");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDb = require("./config/dbConfig");
const router = require("./routes/routes");
const taskrouter = require("./routes/taskRoutes");

const app = express();
const PORT = process.env.PORT;
connectDb();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.set("trust proxy", 1);

app.use("/users", router);
app.use("/tasks", taskrouter);

app.listen(PORT, () => console.log("Server running in port " + PORT));
