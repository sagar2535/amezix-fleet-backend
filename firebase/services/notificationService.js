import admin from "../firebase.js";

/**
 * Send a notification to a specific device using FCM.
 *
 * @param {string} token - The FCM registration token of the target device.
 * @param {string} title - The title of the notification.
 * @param {string} body - The body text of the notification.
 * @param {Object} data - Custom data to be sent with the notification.
 * @returns {Promise<string>} - The result of sending the notification.
 */
export const sendNotification = async (token, title, body, data = {}) => {
  const message = {
    notification: {
      title: title,
      body: body,
    },
    data: data,
    token: token,
  };

  try {
    const response = await admin.messaging().send(message);
    console.log("Successfully sent message:", response);
    return response;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};
