const express = require("express");
const app = express();
app.use(express.json());

const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.BACKEND_PORT;

const weatherController = require("./controllers/weather");
const testController = require("./controllers/test");
const statusController = require("./controllers/status");

const cors = require("cors");

app.use(
    cors({
        origin: `${process.env.FRONTEND_URL}:${process.env.FRONTEND_PORT}`,
        origin: `127.0.0.1:${process.env.FRONTEND_PORT}`,
        origin: `localhost:${process.env.FRONTEND_PORT}`
    })
);

app.get("/", (req, res) => {
    res.send("This is the root endpoint!");
});

app.get("/api", (req, res) => {
    res.send("This is the root api endpoint!");
});

app.use("/api/weather", weatherController);
app.use("/api/test", testController);
app.use("/api/status", statusController);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
