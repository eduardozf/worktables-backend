import axios, { AxiosInstance } from "axios";
import { ISearchBodyType } from "./WeatherBuilder";
import { config } from "@/config";
import { parseISO } from "date-fns";

interface IWeather {
  getWeather(body: any): Promise<unknown>;
  normalizeResponse(body: any): IWeatherResponse;
}

class OpenWeatherMapApi implements IWeather {
  private endpoint: string;
  private api: AxiosInstance;

  constructor() {
    this.endpoint = "https://api.openweathermap.org/data/2.5/";
    this.api = axios.create({ baseURL: this.endpoint });
  }

  public async getWeather({ lat, lon }: ISearchBodyType) {
    const params = {
      lat,
      lon,
      appid: config.openWeatherApiKey,
      units: "metric",
      exclude: "minutely,alerts",
    };

    const response = await this.api.get("onecall", {
      params,
    });

    return response.data;
  }

  public normalizeResponse(body: any): IWeatherResponse {
    return {
      source: "open_weather_map",
      data: this.parseWeatherData(body),
    } as IWeatherResponse;
  }

  // Map input to expected interface
  private parseWeatherData(data: any): Array<IWeatherForecastItem> {
    const dailyData = data?.daily;
    const hourlyData = data?.hourly;
    if (!dailyData) return [];

    return dailyData.map((item: any) => {
      const day_resume = this.parseCommon(item);

      // Extract hourly data for the day
      const dateStart = parseISO(new Date(item?.dt * 1000).toISOString());
      const hour: IWeatherInfoHour[] = hourlyData
        ? hourlyData
            .filter((hourItem: any) => {
              const hourDate = new Date(hourItem.dt * 1000);
              return hourDate.getUTCDate() === dateStart.getUTCDate();
            })
            .map((hourItem: any) => {
              return {
                time: parseISO(new Date(hourItem?.dt * 1000).toISOString()),
                ...this.parseCommon(hourItem),
              };
            })
        : [];

      return {
        date: dateStart,
        day_resume,
        hour,
      };
    });
  }

  // Map input to expected interface
  private parseCommon(item: any): IWeatherInfo {
    const weatherInfo: IWeatherInfo = {
      avg_temp_c: item?.temp?.day || item?.temp || 0,
      avg_humidity: item?.humidity || 0,
      avg_wind_speed: item?.wind_speed || 0,
      avg_rain_chance: item?.pop * 100 || 0, // Probability of precipitation
      condition: item?.weather?.[0]?.description || "None",
      icon:
        `https://openweathermap.org/img/wn/${item?.weather?.[0]?.icon}.png` ||
        "/error.jpg",
    };

    return weatherInfo;
  }
}

export default OpenWeatherMapApi;
