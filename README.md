
# Application of Computer Vision in Estimating Traffic Density for Automatic Signal Timing Setting

## Academic Project Overview
This application demonstrates a computer vision-based approach to urban traffic management. It uses AI to detect vehicles from a video feed, calculates the Passenger Car Unit (PCU) density, and automatically recommends optimal green signal timings.

## Objectives
- **Detection**: Real-time identification of Cars, Bikes, Buses, and Trucks.
- **Density Estimation**: Conversion of raw counts into PCU scores.
- **Adaptive Timing**: Rule-based logic for dynamic traffic signal control.

## Logic Constraints (For Viva/Presentation)
- **Passenger Car Unit (PCU) Weights**:
  - Car: 1.0
  - Bike/Motorcycle: 0.5
  - Bus/Truck: 3.0
- **Timing Logic**:
  - Low Density (≤10 PCU): 20s minimum green time.
  - Medium Density (11-30 PCU): Linear scaling up to 60s.
  - High Density (>30 PCU): Extended scaling up to 120s maximum.

## Technical Stack
- **Frontend**: React (v19)
- **UI Styling**: Tailwind CSS
- **AI Engine**: Gemini 1.5/2.0 Flash (Computer Vision)
- **Visuals**: Lucide Icons & Recharts for Analytics
