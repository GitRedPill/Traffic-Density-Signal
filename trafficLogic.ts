
import { VehicleCounts, DensityLevel, SignalResults } from '../types';

/**
 * Standard Passenger Car Unit (PCU) Weights:
 * Car = 1.0
 * Bike/Motorcycle = 0.5
 * Bus = 3.0
 * Truck = 3.0
 */
const PCU_WEIGHTS = {
  car: 1.0,
  bike: 0.5,
  bus: 3.0,
  truck: 3.0
};

export const calculateSignalTiming = (counts: VehicleCounts): SignalResults => {
  const pcu = (counts.car * PCU_WEIGHTS.car) +
              (counts.bike * PCU_WEIGHTS.bike) +
              (counts.bus * PCU_WEIGHTS.bus) +
              (counts.truck * PCU_WEIGHTS.truck);

  let densityLevel: DensityLevel;
  let greenTime: number;

  if (pcu <= 10) {
    densityLevel = DensityLevel.LOW;
    greenTime = 20; // Default minimum
  } else if (pcu <= 30) {
    densityLevel = DensityLevel.MEDIUM;
    greenTime = Math.min(60, Math.floor(20 + (pcu - 10) * 2)); // Dynamic increase
  } else {
    densityLevel = DensityLevel.HIGH;
    greenTime = Math.min(120, Math.floor(60 + (pcu - 30) * 1.5)); // High traffic max scaling
  }

  return {
    pcu,
    densityLevel,
    greenTime,
    counts
  };
};
