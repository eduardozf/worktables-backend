export {};

declare global {
  interface IWeather {
    getWeather(body: any): Promise<unknown>;
    parseResponse(body: any): IWeatherResponse;
  }

  interface IWeatherLocation {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    timezoneId: string;
    localTime: string;
  }

  interface IWeatherInfo {
    minTemp: number;
    maxTemp: number;
    currentTemp: number;
    windSpeed: number;
    rainChance: number;
  }

  interface IWeatherResponse {
    location: IWeatherLocation;
    forecast: Array<IWeatherInfo>;
  }
}
