import axios, { AxiosInstance } from "axios";
import { ISearchBodyType } from "./WeatherBuilder";
import { config } from "@/config";
import { parseISO } from "date-fns";

class WeatherApi implements IWeather {
  private endpoint: string;
  private api: AxiosInstance;

  constructor() {
    this.endpoint = "http://api.weatherapi.com/v1/";
    this.api = axios.create({ baseURL: this.endpoint });
  }

  public async getWeather({ lat, lon }: ISearchBodyType) {
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

  public normalizeResponse(body: any): IWeatherResponse {
    return {
      source: "weather_api",
      data: this.parseWeatherData(body),
    } as IWeatherResponse;
  }

  // Map input to expected interface
  private parseWeatherData(data: any): Array<IWeatherForecastItem> {
    const forecastData = data?.forecast?.forecastday;
    if (!forecastData) return [];

    return forecastData?.map((item: any) => {
      const day_resume = this.parseCommon(item?.day);

      const hour: IWeatherInfoHour[] = item?.hour?.map((hourItem: any) => {
        return {
          time: parseISO(hourItem?.time || "0"),
          ...this.parseCommon(hourItem),
        };
      });

      return {
        date: parseISO(item?.date || "0"),
        day_resume,
        hour,
      };
    });
  }

  // Map input to expected interface
  private parseCommon(item: any): IWeatherInfo {
    const weatherInfo: IWeatherInfo = {
      avg_temp_c: item?.avgtemp_c || item?.temp_c || 0,
      avg_humidity: item?.avghumidity || 0,
      avg_wind_speed: item?.avgvis_km || 0,
      avg_rain_chance: item?.daily_chance_of_rain || item?.chance_of_rain || 0,
      condition: item?.condition?.text || "None",
      icon: item?.condition?.icon || "/error.jpg",
    };

    return weatherInfo;
  }
}
export default WeatherApi;
