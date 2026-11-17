export const ROUTES = {
  HOME: "/",
  EXERCISES: "/exercises",
  CALIBRATION: "/calibration",
  CAMERA: "/camera",
  SESSION: "/session",
  RESULTS: "/results",
} as const;

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES];
