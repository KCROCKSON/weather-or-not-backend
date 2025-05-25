const express = require("express");
const router = express.Router();
router.use(express.json());

const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const pool = require("../database/db");

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
        const cityWeatherData = await pool.query(
            `SELECT data FROM weather_requests WHERE city = $1 AND updated_at >= NOW() - INTERVAL '1 hour'`,
            [query]
        );

        if (cityWeatherData.rowCount === 0) {
            const response = await axios.request(options);
            const weatherData = response.data;

            await pool.query(
                `INSERT INTO weather_requests (city, data, updated_at)
                 VALUES ($1, $2, NOW())
                 ON CONFLICT (city)
                 DO UPDATE SET data = EXCLUDED.data, updated_at = EXCLUDED.updated_at`,
                 [query, weatherData]
            );

            res.send(response.data);
        } else if (cityWeatherData.rowCount > 0) {
            res.send(cityWeatherData.rows[0].data);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to fetch weather data" });
    }
});

module.exports = router;
