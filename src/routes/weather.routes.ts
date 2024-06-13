import WeatherController from "@/controllers/weather.controller";
import { Router } from "express";

const controller = new WeatherController();

const weatherRouter = Router();

weatherRouter.get("/", controller.getWeather);

export { weatherRouter };
