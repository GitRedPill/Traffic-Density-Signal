import React from "react";
import { createRoot } from "react-dom/client";
import { getTrafficEstimate } from "./trafficLogic.js";
import { getTimingSuggestion } from "./geminiService.js";

async function App() {
  const rootEl = document.getElementById("root");
  const container = document.createElement("div");
  container.className = "p-6 max-w-3xl mx-auto";

  const title = document.createElement("h1");
  title.textContent = "Traffic Density & Signal Timing Estimator";
  title.className = "text-2xl font-semibold mb-4";
  container.appendChild(title);

  const status = document.createElement("div");
  status.className = "mb-4 text-sm text-gray-600";
  status.textContent = "Calculating...";
  container.appendChild(status);

  const result = document.createElement("pre");
  result.className = "bg-white p-4 rounded shadow mono";
  result.textContent = "";
  container.appendChild(result);

  rootEl.appendChild(container);

  try {
    const estimate = await getTrafficEstimate();
    const suggestion = await getTimingSuggestion(estimate);
    status.textContent = "Estimate complete.";
    result.textContent = JSON.stringify({ estimate, suggestion }, null, 2);
  } catch (err) {
    status.textContent = "Error: " + err.message;
  }

  return null;
}

// Render using the React runtime (no JSX used)
const root = createRoot(document.getElementById("root"));
root.render(React.createElement(App));