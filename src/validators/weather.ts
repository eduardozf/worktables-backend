import { z } from "zod";

export const weatherRequestValidator = z.object({
  lat: z.string(),
  lon: z.string(),
});
