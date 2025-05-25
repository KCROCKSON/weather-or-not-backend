const express = require("express");
const router = express.Router();
router.use(express.json());

const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

router.get("/", (req, res) => {
    const status = {
        Status: "Running",
    };

    res.send(status);
});

module.exports = router;
