import { config } from "dotenv";
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  process.exit(1);
});

config();

import app from "./app.js";

const port = process.env.PORT || 3005;

console.log(`Node Enviornment is : ${process.env.NODE_ENV}`);

const server = app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
