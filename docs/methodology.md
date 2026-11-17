# REHABPOSE Research & Technical Methodology

## 1. Problem Statement

Rehabilitation exercises require proper joint angles, sufficient Range of Motion (ROM), and controlled execution without compensatory movements. In home-based rehabilitation, continuous physiotherapist supervision is often unavailable, making it difficult to detect incomplete repetitions or improper form. Furthermore, applying identical fixed angle thresholds to all individuals fails to account for inter-individual differences in physical capacity and joint mobility limitations.

REHABPOSE addresses how standard RGB cameras can be used to evaluate rehabilitation exercise quality while accounting for individual ROM capacity.

---

## 2. Research Questions & Hypotheses

### Research Questions
- **AS1:** When using Fixed Thresholds or physiotherapist-approved Personalized ROM references based on whether a participant can reach the target joint angle in Elbow Flexion and Shoulder Flexion, how does the rule-based system's movement classification performance compare against independent physiotherapist labels?
- **AS2:** How do camera angle, camera-to-user distance, lighting conditions, and partial occlusion affect joint tracking, repetition counting, and processing performance of the live system?
- **AS3:** What is the classification performance of a Random Forest model trained on 3D kinematic features from IntelliRehabDS in distinguishing `Correct` and `Incorrect` movements on unseen participants?

### Hypotheses
- **H1 (Conditional Evaluation):** The rule-based system using Fixed Thresholds or physiotherapist-approved Personalized ROM references can produce movement evaluation decisions with measurable agreement with independent physiotherapist labels.
- **H2 (Camera Conditions):** Variations in camera angle, distance, lighting, and partial occlusion will measurably impact landmark tracking and repetition counting performance.
- **H3 (Machine Learning):** 3D kinematic features extracted from IntelliRehabDS enable a Random Forest classifier to distinguish `Correct` and `Incorrect` classes on subject-independent test data.

---

## 3. Dual-Track Technical Approach

### Track 1: Live 2D MediaPipe + Rule-Based Evaluation
1. **Capture & Pose Estimation:** Standard RGB camera frames are processed via OpenCV and MediaPipe Pose Landmarker to extract 33 2D body landmarks.
2. **Kinematic Feature Extraction:** Computes joint angles, ROM, movement duration, angular velocity, and compensatory movement indicators.
3. **State Machine Repetition Tracking:** Tracks movement phases (start, peak, return) to count repetitions and detect `Incomplete` attempts.
4. **Conditional Rule-Based Classification:** Classifies each repetition as `Correct`, `Incorrect`, or `Incomplete` using either Fixed Thresholds or Personalized ROM references.

### Track 2: Offline 3D Random Forest Classification
1. **Data Source:** IntelliRehabDS Kinect v2 3D skeleton coordinates (25 joints) with expert `Correct` / `Incorrect` labels.
2. **Subject-Based Split:** 20 participants for training, 9 participants for testing (zero participant overlap).
3. **Leakage Prevention:** Missing value handling, feature selection, scaling (if needed), and hyperparameter tuning (`n_estimators`, `max_depth`, node splitting criteria) are performed **strictly inside** each `GroupKFold` training fold. Test data is touched only once for final evaluation.

---

## 4. Variables & Evaluation Metrics

- **Independent Variables:** Participant group (healthy vs. movement-limited), user-selected exercise type, evaluation method (Fixed Thresholds vs. Personalized ROM), camera angle, camera distance, lighting level, and partial occlusion level.
- **Dependent Variables:** Movement classification results, repetition count error (MAE), landmark visibility/tracking continuity, frame rate (FPS), and processing latency (ms).
- **Evaluation Metrics:**
  - Classification: Accuracy, Precision, Recall, F1-Score, **Macro-F1** (primary metric due to class imbalance; target `>= 0.82` for Random Forest), and Confusion Matrix.
  - Counting: Repetition Count **MAE** (`<= 0.15` repetitions).
  - Angle Accuracy: Joint Angle **MAE** (`<= 5°`, evaluated only if an independent reference measurement device is available).
  - System Speed: **FPS** (`>= 24`) and **Latency** (`<= 40 ms`).

---

## 5. Project Work Packages (12-Month Plan)

| Work Package | Timeline | Scope |
| :--- | :--- | :--- |
| **İP1 – Data Preparation & Experiment Design** | Months 1–3 | Dataset preparation, participant groups, exercise selection flow, evaluation criteria, and test protocol. |
| **İP2 – Camera-Based Movement Analysis** | Months 2–5 | OpenCV + MediaPipe Pose integration; joint angle, ROM, duration, angular velocity, and repetition counting. |
| **İP3 – Rule-Based Evaluation & Calibration** | Months 4–7 | Fixed Thresholds, Personalized ROM Calibration, rule engine (`Correct`/`Incorrect`/`Incomplete`), and visual feedback. |
| **İP4 – Random Forest Model Development** | Months 4–8 | 3D feature extraction from IntelliRehabDS, `GroupKFold` tuning, and subject-independent testing. |
| **İP5 – Experimental Tests & Performance Analysis** | Months 7–10 | 20-participant live trials, blinded physiotherapist labeling, MAE/FPS/Latency, and camera robustness tests. |
| **İP6 – System Integration & Validation** | Months 10–12 | End-to-end prototype integration, functional testing, and final validation/reporting. |
