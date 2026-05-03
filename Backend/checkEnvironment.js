export function checkEnvironment() {
  const requiredVars = ["AI_URL", "AI_MODEL", "AI_KEY"];

  requiredVars.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing ${key} in .env file`);
    }
  });

  //console.log("✅ Environment variables loaded successfully");
}
