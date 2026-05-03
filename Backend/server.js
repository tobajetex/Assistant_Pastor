import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { checkEnvironment } from "./checkEnvironment.js";
import { giftController } from "./controllers/giftController.js";

import cors from "cors";

//End of added code
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
checkEnvironment();

app.post("/api/spiritual", giftController);
const PORT = 3008;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
