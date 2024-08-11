import path from "path";
import express from "express";
import AppError from "../utils/AppError.js";
import cors from "cors";
import userRoutes from "../routes/userRoutes.js";
import DeliveryRegistrationRoutes from "../routes/DeliveryRegistrationRoutes.js";
import AuthRoutes from "../routes/AuthRoutes.js";
import morgan from "morgan";

const app = express();
app.use(cors());

app.options("*", cors());

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "public")));

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.get("/", (req, res) => {
  res.status(200).json(true);
});

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/delivery", DeliveryRegistrationRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can not find ${req.originalUrl} on this server`, 404));
});

export default app;
