// trafficLogic: simple client-side traffic estimator
export async function getTrafficEstimate() {
  // In a real app this would call sensors, APIs, or analyze images.
  // Here we return a deterministic example based on time of day.
  const hour = new Date().getHours();
  let density = "low";
  let vehiclesPerMin = 5;
  if (hour >= 7 && hour < 10) { density = "high"; vehiclesPerMin = 60; }
  else if (hour >= 16 && hour < 19) { density = "high"; vehiclesPerMin = 55; }
  else if (hour >= 10 && hour < 16) { density = "medium"; vehiclesPerMin = 20; }

  return {
    timestamp: new Date().toISOString(),
    density,
    vehiclesPerMin
  };
}