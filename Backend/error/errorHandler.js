export function handleAPIError(error) {
  console.log("RAW ERROR:", error); // 👈 add this for debugging

  // ✅ Already processed error
  if (error instanceof Error && error.status) {
    return error;
  }

  // 🌐 Network errors (Node fetch)
  if (error instanceof TypeError) {
    return new Error("Network error. Check your internet connection.");
  }

  // ⏱️ Timeout
  if (error.type === "TIMEOUT") {
    return new Error("Request timed out. Try again.");
  }

  // 🌐 Custom network error
  if (error.type === "NETWORK_ERROR") {
    return new Error("No internet connection.");
  }

  // 🔢 HTTP errors
  if (error.type === "HTTP_ERROR") {
    switch (error.status) {
      case 400:
        return new Error("Bad request.");
      case 401:
        return new Error("Invalid API key.");
      case 403:
        return new Error("Access denied.");
      case 404:
        return new Error("Model or endpoint not found.");
      case 426:
        return new Error("Upgrade required.");
      case 429:
        return new Error("Too many requests.");
      case 500:
      case 502:
      case 503:
        return new Error("AI server error.");
      default:
        return new Error(`HTTP error: ${error.status}`);
    }
  }

  // 🧠 OpenRouter / API-specific error
  if (error?.message) {
    return new Error(error.message);
  }

  // ❌ fallback
  return new Error("Unknown error occurred.");
}
