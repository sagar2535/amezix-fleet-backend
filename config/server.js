import { config } from "dotenv";
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err);
  process.exit(1);
});

config();

import app from "./app.js";
import { sendNotification } from "../firebase/services/notificationService.js";

const token =
  "fo2uCGzYSoOLXscTpwTSbG:APA91bHQiuOIHOZ9Bm5DyWv28E0Mgm-sPpbiCWgc9xQe0ROvirgJK2NSqX7rPxuFiO4FCZ851d1g_oHEM3qD_PT2Ctu2iP-rHTsUJ3PTqb143geeqJe46pev1HcX2cUrgIbK7BkkdssC";
const title = "Test Notification";
const body = "This is a test notification from Firebase Admin SDK.";
const data = {
  id: "notification_channel",
  name: "notification_channel",
  sound: "order__notification",
};

sendNotification(token, title, body, data)
  .then((response) => {
    console.log("Notification sent successfully:", response);
  })
  .catch((error) => {
    console.error("Error sending notification:", error);
  });

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
