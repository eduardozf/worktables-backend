import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  openWeatherApiKey: process.env.OPEN_WEATHER_MAP_API_KEY,
  weatherApiKey: process.env.WEATHER_API_KEY,
};
