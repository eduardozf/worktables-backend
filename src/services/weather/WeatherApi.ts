import axios, { AxiosInstance } from "axios";
import { ISearchBodyType } from "./WeatherBuilder";
import { config } from "@/config";

class WeatherApi implements IWeather {
  private endpoint: string;
  private api: AxiosInstance;

  constructor() {
    this.endpoint = "http://api.weatherapi.com/v1/";
    this.api = axios.create({ baseURL: this.endpoint });
  }

  async getWeather({ lat, lon }: ISearchBodyType) {
    const q = `${lat},${lon}`;
    const params = {
      key: config.weatherApiKey,
      aqi: "no",
      alerts: "no",
      days: 6,
      q,
    };

    const response = await this.api.get("forecast.json", {
      params,
    });

    return response.data;
  }

  parseResponse(body: any): IWeatherResponse {
    return {} as IWeatherResponse;
  }
}
export default WeatherApi;
