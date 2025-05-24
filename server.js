const express = require("express");
const app = express();
app.use(express.json());

const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT;

const weatherController = require("./controllers/weather");
const testController = require("./controllers/test");

app.get("/", (req, res) => {
    res.send("This is the root endpoint!");
});

app.get("/api", (req, res) => {
    res.send("This is the root api endpoint!");
});

app.get("/api/status", (req, res) => {
    const status = {
        Status: "Running",
    };

    res.send(status);
});

app.use("/api/weather", weatherController);
app.use("/api/test", testController);

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
