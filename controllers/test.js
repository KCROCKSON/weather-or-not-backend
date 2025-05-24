const express = require("express");
const router = express.Router();
router.use(express.json());

const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

router.get("/weather", async (req, res) => {
    const options = {
        method: "GET",
        baseURL: "http://localhost:3000",
        url: `/api/test/fullweather`,
    };

    try {
        const response = await axios.request(options);
        const newResponse = {};

        newResponse.location = {};
        newResponse.current = {};

        newResponse.location.name = response.data.location.name;
        newResponse.location.localtime = response.data.location.localtime;

        newResponse.current.temperature = response.data.current.temperature;
        newResponse.current.weather_icons = response.data.current.weather_icons;
        newResponse.current.weather_descriptions =
            response.data.current.weather_descriptions;
        newResponse.current.wind_speed = response.data.current.wind_speed;
        newResponse.current.humidity = response.data.current.humidity;

        res.send(newResponse);

        res.send(newResponse.data);
    } catch (error) {
        console.error(error);
    }
});

router.get("/fullweather", (req, res) => {
    const response = {
        request: {
            type: "City",
            query: "Ottawa, Canadaaaaa",
            language: "en",
            unit: "m",
        },
        location: {
            name: "Ottawa",
            country: "Canada",
            region: "Ontario",
            lat: "45.417",
            lon: "-75.700",
            timezone_id: "America/Toronto",
            localtime: "2025-05-24 16:06",
            localtime_epoch: 1748102760,
            utc_offset: "-4.0",
        },
        current: {
            observation_time: "08:06 PM",
            temperature: 11,
            weather_code: 122,
            weather_icons: [
                "https://cdn.worldweatheronline.com/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png",
            ],
            weather_descriptions: ["Overcast"],
            astro: {
                sunrise: "05:23 AM",
                sunset: "08:37 PM",
                moonrise: "03:32 AM",
                moonset: "05:53 PM",
                moon_phase: "Waning Crescent",
                moon_illumination: 14,
            },
            air_quality: {
                co: "562.4",
                no2: "13.32",
                o3: "47",
                so2: "2.22",
                pm2_5: "2.96",
                pm10: "2.96",
                "us-epa-index": "1",
                "gb-defra-index": "1",
            },
            wind_speed: 9,
            wind_degree: 17,
            wind_dir: "NNE",
            pressure: 1013,
            precip: 0,
            humidity: 76,
            cloudcover: 100,
            feelslike: 10,
            uv_index: 0,
            visibility: 24,
            is_day: "yes",
        },
    };
    res.send(response);
});

module.exports = router;
