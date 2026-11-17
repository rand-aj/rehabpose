# Calibration Methodology

## 1. Conditional Evaluation Selection

REHABPOSE selects the movement evaluation reference **conditionally**, based on each participant's actual ability to reach the physiotherapist-defined target joint angle for their chosen exercise—regardless of whether the participant belongs to the healthy or movement-limited group:

- **Can reach target joint angle** $\rightarrow$ **Fixed Thresholds**
- **Cannot reach target joint angle** $\rightarrow$ **Personalized ROM Calibration**

> [!NOTE]
> Because Fixed Thresholds and Personalized ROM Calibration are applied to different movement-capacity conditions using different reference baselines, their classification accuracies are **not** directly compared to claim one method is superior to the other.

---

## 2. Fixed Thresholds

For participants who can achieve the standard target joint angle for the selected exercise:
- Evaluation uses **pre-defined, standardized ROM and joint angle thresholds** established by a physiotherapist based on biomechanical criteria.
- Live joint angles, ROM, movement duration, angular velocity, and compensatory movements extracted via MediaPipe Pose are compared directly against these fixed reference thresholds.

---

## 3. Personalized ROM Calibration

For participants who cannot reach the standard target joint angle due to mobility restrictions:

1. **Baseline Calibration Trial:** Before the evaluation session, the participant performs the selected exercise up to their **maximum pain-free Range of Motion (ROM)**.
2. **Kinematic Capture:** MediaPipe Pose records the achieved joint angles and ROM values during the calibration movement.
3. **Physiotherapist Review & Approval:** A physiotherapist reviews the recorded measurements and approves a **personalized ROM target**, acceptable lower bounds, and movement quality criteria tailored to that participant and exercise.
4. **Reference Persistence:** The approved personal reference profile (target angles, ROM thresholds, and error criteria) is stored for that participant and exercise. Subsequent sessions use this approved profile automatically without requiring re-calibration or live therapist intervention on every run.
5. **Biomechanical Guardrails:** Personalized thresholds remain bounded within physiotherapist-defined biomechanical safety and form criteria (e.g., compensatory movement rules still apply).
