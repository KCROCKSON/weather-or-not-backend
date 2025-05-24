const express = require("express");
const router = express.Router();
router.use(express.json());

const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

router.get("/", async (req, res) => {
    query = req.query.query;

    const options = {
        method: "GET",
        baseURL: process.env.WEATHERSTACK_URL,
        url: `/current?access_key=${process.env.ACCESS_KEY}`,
        params: {
            query: query,
        },
    };

    try {
        const response = await axios.request(options);

        res.send(response.data);
    } catch (error) {
        console.error(error);
    }
});

module.exports = router;
