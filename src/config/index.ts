import dotenv from "dotenv";

dotenv.config();

export const config = {
  weatherApiKey: process.env.WEATHER_API_KEY,
  port: process.env.PORT || 3000,
};
