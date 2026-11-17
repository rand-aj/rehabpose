# Exercise Rules & Movement Classification

## 1. Supported Exercises & Anatomical Landmarks

REHABPOSE evaluates two upper-limb rehabilitation exercises using 2D MediaPipe Pose landmarks on the participant's active arm side:

1. **Elbow Flexion & Extension**
   - **Landmarks Used:** Shoulder, Elbow, Wrist.
2. **Shoulder Flexion & Extension**
   - **Landmarks Used:** Shoulder, Hip, and arm-alignment landmarks (representing trunk-to-arm angle).

---

## 2. Computed Kinematic Features

For every valid frame and repetition, the system computes:
- **Joint Angle:** Instantaneous 2D angle at the target joint (elbow or shoulder).
- **Range of Motion (ROM):** Difference between maximum and minimum joint angles achieved during a repetition ($\text{ROM} = \theta_{\max} - \theta_{\min}$).
- **Movement Duration:** Elapsed time from repetition start to repetition completion.
- **Angular Velocity:** Rate of change of the joint angle over time ($\Delta\theta / \Delta t$).
- **Compensatory Movements:** Detection of improper form such as:
  - Trunk leaning forward, backward, or laterally.
  - Excessive/unnecessary shoulder elevation.
  - Early elbow flexion (during shoulder flexion).
- **Repetition Count:** Automated counting of movement cycles via a State Machine.

---

## 3. Live Classification Categories

Each detected repetition in the live rule-based system is classified into one of three classes:

| Class | Definition |
| :--- | :--- |
| **Correct** | Completed repetition that reaches the applicable ROM target (Fixed Threshold or Personalized ROM) in the proper anatomical plane without significant compensatory movements. |
| **Incorrect** | Completed repetition that violates biomechanical movement rules (e.g., shoulder elevation, early elbow flexion, insufficient ROM, or trunk leaning). |
| **Incomplete** | Repetition that was initiated but failed to complete the required movement phases (detected algorithmically by the State Machine). |

---

## 4. Algorithmic Detection of `Incomplete` Repetitions (State Machine)

Because the IntelliRehabDS dataset lacks `Incomplete` examples, this class is handled exclusively in the live system via a **State Machine** tracking start, peak, and return phases. A repetition is labeled `Incomplete` under any of the following conditions:

1. **Insufficient Peak:** The user initiates the movement from the starting position but returns to the start position before reaching the required portion of the target ROM.
2. **Aborted Return:** The user reaches the peak of the movement but stops/aborts before returning to the starting position.
3. **Timeout / Stall:** Angular velocity remains near zero for longer than the defined timeout threshold during an active repetition.

---

## 5. Landmark Visibility & Tracking Guard

- **Minimum Visibility Threshold:** `Landmark Visibility >= 0.65`.
- If required joint landmarks fall below `0.65` or tracking is lost, the system **must not** classify the movement as `Incorrect` or `Incomplete`. Instead, it displays a technical warning to the user and pauses evaluation until reliable tracking resumes.
