import { z } from "zod";
import { weatherRequestValidator } from "@/validators/weather";
import ApiError from "@/errors/ApiError";
import WeatherApi from "./WeatherApi";
import OpenWeatherMapApi from "./OpenWeatherMapApi";

export type ISearchBodyType = z.infer<typeof weatherRequestValidator>;

class WeatherBuilder {
  private api: IWeather;
  private fallbackApiList: Array<IWeather>;

  constructor() {
    this.api = new WeatherApi();
    this.fallbackApiList = [new OpenWeatherMapApi()];
  }

  addFallback(api: IWeather): this {
    this.fallbackApiList.push(api);

    return this;
  }

  async search({ lat, lon }: ISearchBodyType) {
    let weather;

    try {
      weather = await this.api.getWeather({ lat, lon });
      return this.api.normalizeResponse(weather);
    } catch (error) {
      console.error("Main API failed, trying fallback APIs:", error);
    }

    if (this.fallbackApiList.length === 0) {
      throw new ApiError("All weather APIs failed");
    }

    const fallbackPromises = this.fallbackApiList.map((api) =>
      api
        .getWeather({ lat, lon })
        .then((weather) => api.normalizeResponse(weather))
    );

    // First fallback to respond returns data to user
    try {
      const response = await Promise.race(fallbackPromises);
      return response;
    } catch (error) {
      console.error("All fallback APIs failed:", error);
      throw new ApiError("All weather APIs failed");
    }
  }
}

export default WeatherBuilder;
