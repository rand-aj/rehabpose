# Testing & Validation Protocol

## 1. Live System Participant Protocol

- **Sample Size:** **20 adult volunteers** ($\ge 18$ years old):
  - **10 healthy participants**
  - **10 participants with movement limitations** (screened by a physiotherapist for safe participation; individuals with conditions posing risk or preventing exercise execution are excluded).
- **Ethics & Consent:** Informed voluntary consent and ethics committee approval (or official exemption) must be obtained before collecting any participant data.
- **Exercise Selection & Repetitions:** Each participant freely chooses **one** exercise (Elbow Flexion or Shoulder Flexion) and performs **5 repetitions**, producing **100 core repetitions** across the study.
- **Statistical Unit:** Repeated-measures design where each participant's 5 repetitions are treated as repeated measurements belonging to that participant (participants are treated as independent units). Results are analyzed at both the repetition and participant levels.
- **Class Representation:** If natural trials yield insufficient samples for `Correct`, `Incorrect`, or `Incomplete`, safe controlled additional trials may be conducted under physiotherapist supervision and analyzed separately from the 100 core repetitions.

---

## 2. Independent Physiotherapist Ground Truth

- A physiotherapist observes all 20 participants (100 core repetitions) **live in person** without video recording.
- **Blinding:** The physiotherapist labels each repetition (`Correct`, `Incorrect`, or `Incomplete`) **without seeing** the system's classification outputs or computed kinematic metrics.
- System outputs are compared against these independent labels post-session. *(Note: Reliance on a single independent evaluator is documented as a study limitation.)*

---

## 3. Camera & Environmental Robustness Tests

Conducted as a separate technical test suite with a **Baseline** condition established first, followed by varying one factor at a time while holding others constant. At least **3 independent measurement trials** (restarting the system/session between trials) are performed per condition:

| Parameter | Target Test Range / Levels | Purpose |
| :--- | :--- | :--- |
| **Camera Distance** | `1.5 – 2.8 m` | Evaluate full upper-body/arm framing and landmark visibility. |
| **Camera Angle** | `0° – 45°` | Evaluate monocular angle sensitivity and joint tracking stability. |
| **Lighting Conditions** | `50 – 1200 Lux` | Evaluate tracking robustness across typical indoor lighting levels. |
| **Partial Occlusion** | `0%`, `25%`, `50%` | Evaluate tracking behavior when the arm/joint is partially occluded. |
| **Landmark Visibility** | `>= 0.65` | Threshold for reliable angle computation vs. technical warning. |

*(Note: These ranges are initial test targets subject to refinement during pilot testing before official data collection.)*

---

## 4. Target Performance Criteria

The following represent **initial project success targets** (not pre-verified results) to be evaluated experimentally:

| Metric | Target | Scope |
| :--- | :--- | :--- |
| **Random Forest Macro-F1** | `>= 0.82` | Offline IntelliRehabDS subject-independent test set (`Correct` vs. `Incorrect`). |
| **Repetition Count MAE** | `<= 0.15 repetitions` | Live system repetition count vs. manual/reference count across participant sessions. |
| **Joint Angle MAE** | `<= 5°` | Evaluated **only** if an independent, comparable reference angle measurement device is available. |
| **Processing Speed** | `>= 24 FPS` | Real-time CPU-only frame processing rate. |
| **Processing Latency** | `<= 40 ms` | Per-frame processing and result generation delay. |
