import "express-async-errors";
import express from "express";
import cors from "cors";
import routes from "../../routes";
import { errorHandler } from "@/middlewares/errorHandler";
import { config } from "@/config";

const app = express();

app.use(express.json());
app.use(cors()); // TODO add cors URL when pushing to production

// Add application routes
app.use(routes);

// Handle all application erros
app.use(errorHandler);

app.listen(config.port, () => {
  console.log("Server running on port:", config.port);
});

export default app;
