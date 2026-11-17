# RehabPose Architecture

## Overview

RehabPose follows a modular, domain-driven structure split between a Next.js frontend (`client/`) and a Python backend (`server/`).

## Frontend Modules (`client/src/modules/`)

1. `exercise_selection` — Browse and select rehabilitation exercises.
2. `camera` — Webcam capture, controls, and connection status.
3. `calibration` — User baseline calibration workflow and results.
4. `exercise_session` — Real-time joint angle display, repetition counter, and movement feedback.
5. `results` — Post-session summary, repetition breakdown, and final feedback.

## Backend Modules (`server/app/modules/`)

1. `camera` — Incoming frame handling.
2. `pose_estimation` — MediaPipe landmark extraction.
3. `feature_extraction` — Joint angle calculation and movement features.
4. `calibration` — Personalized baseline calibration logic.
5. `fixed_thresholds` — Reference threshold configurations.
6. `exercises` — Exercise definitions and metadata.
7. `rule_based_evaluation` — Rule engine and repetition counting.
8. `machine_learning` — Random Forest inference service.
9. `sessions` — Active session state management.
10. `results` — Session result aggregation.
11. `evaluation_metrics` — Evaluation metric computation.
