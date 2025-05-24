const express = require("express");
const router = express.Router();
router.use(express.json());

const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

router.get("/", async (req, res) => {
    accessKey = process.env.ACCESS_KEY;
    query = req.query.query;

    const options = {
        method: "GET",
        baseURL: "https://api.weatherstack.com",
        url: `/current?access_key=${accessKey}`,
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
