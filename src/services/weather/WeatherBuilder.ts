import { z } from "zod";
import IWeather from "../../types/IWeather";
import { weatherRequestValidator } from "@/validators/weather";

export type ISearchBodyType = z.infer<typeof weatherRequestValidator>;

class WeatherBuilder {
  private api: IWeather;
  private fallbackApiList: Array<IWeather>;

  constructor(mainApi: IWeather) {
    this.api = mainApi;
    this.fallbackApiList = [];
  }

  addFallback(api: IWeather): this {
    this.fallbackApiList.push(api);

    return this;
  }

  async search({ lat, lon }: ISearchBodyType) {
    return this.api.getWeather({ lat, lon });
  }
}

export default WeatherBuilder;
