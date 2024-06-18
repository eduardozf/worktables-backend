export {};

declare global {
  interface IWeather {
    getWeather(body: any): Promise<unknown>;
    normalizeResponse(body: any): IWeatherResponse;
  }

  interface IWeatherInfo {
    avg_temp_c: number;
    avg_humidity: number;
    avg_wind_speed: number;
    avg_rain_chance: number;
    condition: string;
    icon: string;
  }

  interface IWeatherInfoHour extends IWeatherInfo {
    time: Date;
  }

  interface IWeatherForecastItem {
    date: Date;
    day_resume: IWeatherInfo;
    hour: Array<IWeatherInfoHour>;
  }

  interface IWeatherResponse {
    source: "weather_api" | "open_weather_map";
    data: Array<IWeatherForecastItem>;
  }
}
