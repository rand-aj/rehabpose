# REHABPOSE System Architecture

## 1. Overview

**REHABPOSE** (*Kamera Tabanlı Kişiselleştirilmiş Rehabilitasyon Egzersizi Kalite Değerlendirme Sistemi*) is a camera-based rehabilitation exercise quality evaluation prototype developed under the TÜBİTAK 2209-A program. It analyzes **Elbow Flexion/Extension** and **Shoulder Flexion/Extension** exercises using a standard RGB camera (laptop or smartphone) and provides real-time feedback tailored to each user's individual Range of Motion (ROM) capacity.

The system is structured around **two independent technical tracks** whose data sources and evaluation results are kept strictly separate:

1. **Live Camera & Rule-Based Track (2D):** Uses OpenCV and MediaPipe Pose Landmarker (33 2D landmarks) to compute joint angles, ROM, movement duration, angular velocity, compensatory movements, and repetition counts via a State Machine, evaluating quality against either **Fixed Thresholds** or physiotherapist-approved **Personalized ROM** references.
2. **Machine Learning Track (3D):** Uses the **IntelliRehabDS** dataset (Kinect v2 3D skeleton coordinates, 25 joints) to train and evaluate an independent **Random Forest** binary classifier (`Correct` vs. `Incorrect`).

> [!IMPORTANT]
> The 3D Random Forest model is **not** applied directly to live 2D MediaPipe camera data, and the two tracks are evaluated independently without equating their results.

---

## 2. High-Level Pipeline

### Live Evaluation Flow (Track 1)
```text
RGB Camera Frame
  └─► OpenCV + MediaPipe Pose Landmarker (33 2D landmarks)
        └─► Visibility Check (Landmark Visibility >= 0.65)
              ├─ [Fail] ─► Technical Warning (pause evaluation; do not label Incorrect/Incomplete)
              └─ [Pass] ─► Kinematic Feature Extraction (Joint Angle, ROM, Duration, Angular Velocity)
                             └─► Conditional Reference Selection
                                   ├─ Can reach target angle ─► Fixed Thresholds
                                   └─ Cannot reach target angle ─► Personalized ROM Calibration (Therapist-Approved)
                                         └─► State Machine & Rule Engine
                                               ├─► Repetition Count
                                               ├─► Classification: Correct / Incorrect / Incomplete
                                               └─► Real-Time Visual Feedback & Session Summary
```

### Offline ML Flow (Track 2)
```text
IntelliRehabDS (Kinect v2 3D Skeletons, 25 landmarks)
  └─► Subject-Based Split (20 Train / 9 Test participants, zero overlap)
        └─► 3D Kinematic Feature Extraction
              └─► Random Forest Training (GroupKFold CV inside Train set only)
                    └─► Independent Test Evaluation (Correct / Incorrect)
```

---

## 3. Codebase Module Structure

The repository follows a modular, domain-driven split between `Frontend/` (Next.js) and `Backend/` (Python / FastAPI):

### Frontend Modules (`Frontend/src/modules/`)
1. `exercise_selection` — Browse and select between Elbow Flexion and Shoulder Flexion.
2. `camera` — Live webcam/smartphone capture, controls, and connection status.
3. `calibration` — Personalized baseline ROM calibration workflow and approval state.
4. `exercise_session` — Real-time joint angle display, repetition counter, and movement feedback.
5. `results` — Post-session summary, repetition breakdown, and final feedback.

### Backend Modules (`Backend/app/modules/`)
1. `camera` — Incoming frame handling.
2. `pose_estimation` — MediaPipe Pose Landmarker extraction and visibility filtering.
3. `feature_extraction` — Joint angle calculation and kinematic movement features.
4. `calibration` — Personalized baseline ROM calibration logic.
5. `fixed_thresholds` — Standardized biomechanical threshold configurations.
6. `exercises` — Exercise definitions (Elbow Flexion, Shoulder Flexion) and anatomical landmark mappings.
7. `rule_based_evaluation` — Biomechanical rule engine and State Machine repetition counter.
8. `machine_learning` — Random Forest training/inference service for IntelliRehabDS.
9. `sessions` — Active ephemeral session state management.
10. `results` — Session result aggregation.
11. `evaluation_metrics` — Computation of MAE, FPS, Latency, Accuracy, Precision, Recall, and Macro-F1.

---

## 4. Non-Functional Requirements & Scope Boundaries

- **Real-Time CPU Performance:** Must run on a standard laptop without an external GPU (`>= 24 FPS`, processing latency `<= 40 ms`).
- **Privacy & Ephemeral Processing:** Raw camera frames and video recordings are **never** stored persistently. Only necessary kinematic features, repetition counts, and anonymized evaluation outputs are retained in memory (or anonymized research logs where consented).
- **Modularity:** Designed so additional exercises and machine learning models can be added in future stages.
- **Out of Scope (Current Prototype):** Medical diagnosis, treatment/medication prescription, clinical efficacy trials, exercises beyond Elbow/Shoulder Flexion, bilateral symmetry analysis, specialized sensors/multi-camera setups, user authentication/accounts, and administrator panels.
