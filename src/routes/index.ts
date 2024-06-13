import { Router } from "express";
import { weatherRouter } from "./weather.routes";

const router = Router();

router.use("/weather", weatherRouter);

export default router;
