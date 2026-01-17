// geminiService: lightweight local heuristic as a placeholder for an AI service
import { getTrafficEstimate as _ } from "./trafficLogic.js";

export async function getTimingSuggestion(estimate) {
  // If the real GenAI service is wired, replace this with an API call.
  // For now provide a simple timing suggestion based on vehiclesPerMin.
  const vpm = estimate.vehiclesPerMin || 0;
  let greenSeconds = 20;
  if (vpm > 50) greenSeconds = 60;
  else if (vpm > 30) greenSeconds = 45;
  else if (vpm > 15) greenSeconds = 30;

  return {
    recommendedGreenSeconds: greenSeconds,
    rationale: `Based on ${vpm} vehicles/min and density=${estimate.density}`
  };
}