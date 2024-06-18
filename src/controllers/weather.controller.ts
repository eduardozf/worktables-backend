import ApiError from "@/errors/ApiError";
import { zodErrorHandler } from "@/errors/ZodError";
import WeatherBuilder from "@/services/weather/WeatherBuilder";
import { weatherRequestValidator as validator } from "@/validators/weather";
import { Request, Response } from "express";
import { ZodError } from "zod";

class WeatherController {
  public async getWeather(request: Request, response: Response) {
    try {
      const sanitizedBody = await validator.parseAsync(request.query);

      const weather = new WeatherBuilder();
      const weatherData = await weather.search(sanitizedBody);

      return response.json(weatherData);
    } catch (error: unknown) {
      if (error instanceof ZodError) throw zodErrorHandler(error);

      throw new ApiError("Failed to get weather information");
    }
  }
}

export default WeatherController;
