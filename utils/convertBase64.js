export default function base64ToUrl(base64String) {
  // Split the Base64 string to remove the data URL part

  console.log(base64String);
  const parts = base64String.base64.split(",");
  const mimeType = parts[0].match(/:(.*?);/)[1];
  const binaryString = atob(parts[1]); // Decode the Base64 string
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  // Convert the binary string to bytes
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  // Create a Blob from the byte array
  const blob = new Blob([bytes], { type: mimeType });

  // Generate a URL from the Blob
  const url = URL.createObjectURL(blob);

  return url;
}
