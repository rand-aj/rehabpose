# REHABPOSE API Documentation

## 1. Overview

The REHABPOSE backend is built with **FastAPI** (`Backend/app/main.py`) with CORS enabled for the Next.js frontend (`Frontend/`). All API routes are mounted under the `/api` prefix.

> [!NOTE]
> The backend is currently in active modular development. Below is the distinction between **Implemented** endpoints and **Planned** endpoints corresponding to the existing backend modules in `Backend/app/modules/`.

---

## 2. Implemented Endpoints

### Health Check
- **Endpoint:** `GET /api/health`
- **Source:** `Backend/app/api/api_router.py`
- **Description:** Verifies that the FastAPI backend service is running.
- **Response (`200 OK`):**
  ```json
  {
    "status": "success",
    "message": "REHABPOSE API is running",
    "service": "backend"
  }
  ```

---

## 3. Planned Module Endpoints

The following endpoints correspond to the domain modules already scaffolded in `Backend/app/modules/` and the system workflow defined in the project specification:

| Module | Planned Responsibility | Key Inputs / Outputs |
| :--- | :--- | :--- |
| `exercises` | List supported exercises (`elbow_flexion`, `shoulder_flexion`) and their target landmarks/biomechanical rules. | Returns exercise metadata and default fixed thresholds. |
| `calibration` | Run baseline Personalized ROM calibration for users who cannot reach the target joint angle and store physiotherapist-approved ROM references. | Input: calibration landmark/angle stream + therapist approval; Output: personalized ROM profile. |
| `fixed_thresholds` | Retrieve or validate standardized fixed angle/ROM thresholds for each exercise. | Output: fixed biomechanical threshold configuration. |
| `sessions` | Create, manage, and close ephemeral active exercise sessions (in-memory only; no raw video persistence). | Input: selected exercise, evaluation mode (`fixed` or `personalized`); Output: `session_id`. |
| `camera` & `pose_estimation` | Receive live frames/landmarks, run MediaPipe Pose Landmarker (33 2D landmarks), and check `Landmark Visibility >= 0.65`. | Input: frame/stream; Output: 2D landmarks + visibility warning flag. |
| `feature_extraction` | Compute joint angles, ROM, movement duration, angular velocity, and compensatory movement indicators. | Input: 2D landmarks; Output: kinematic feature vector. |
| `rule_based_evaluation` | Run the State Machine and biomechanical rule engine to count repetitions and classify each as `Correct`, `Incorrect`, or `Incomplete`. | Input: kinematic features + active threshold profile; Output: repetition count, class label, error feedback. |
| `results` | Aggregate post-session summary (total repetitions, average ROM, per-repetition classifications). | Input: `session_id`; Output: anonymized session summary. |
| `evaluation_metrics` | Compute and report technical performance metrics (`FPS`, `Latency`, `MAE`, `Accuracy`, `Precision`, `Recall`, `Macro-F1`, `Confusion Matrix`). | Output: performance & validation metrics. |
| `machine_learning` | Offline Random Forest training/evaluation pipeline on IntelliRehabDS 3D skeleton features (`Correct` vs. `Incorrect`). | Input: 3D kinematic features; Output: binary classification & test metrics. |
