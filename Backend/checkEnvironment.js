export function checkEnvironment() {
  if (!process.env.OPENROUTER_API_KEY) {
    throw new Error(`Missing API_KEY in .env file`);
  }

  //console.log("✅ Environment variables loaded successfully");
}
