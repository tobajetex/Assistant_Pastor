export async function safeFetch(url, options, timeout = 15000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(id);

    let data;
    try {
      data = await response.json();
    } catch {
      data = await response.text();
    }

    if (!response.ok) {
      throw {
        type: "HTTP_ERROR",
        status: response.status,
        data,
      };
    }

    return data;
  } catch (err) {
    clearTimeout(id);

    // 🌐 Network / timeout errors
    if (err.name === "AbortError") {
      throw { type: "TIMEOUT", message: "Request timed out" };
    }

    if (err.type === "HTTP_ERROR") {
      throw err;
    }

    throw {
      type: "NETWORK_ERROR",
      message: "Check your internet connection",
    };
  }
}
