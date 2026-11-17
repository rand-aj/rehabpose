# Dataset Description

## 1. IntelliRehabDS (IRDS) — Machine Learning Track

- **Reference:** Miron et al. (2021), *IntelliRehabDS (IRDS)—A dataset of physical rehabilitation movements*, Data, 6(5), 46. ([DOI: 10.3390/data6050046](https://doi.org/10.3390/data6050046) | [Zenodo: 10.5281/zenodo.4610859](https://doi.org/10.5281/zenodo.4610859))
- **Capture Modality:** Microsoft Kinect v2 sensor providing 3D body joint coordinates `(X, Y, Z)` across **25 skeletal landmarks**, paired with expert-annotated movement quality labels.
- **Participants:** **29 total participants** (14 healthy individuals, 15 patients).

### Selected Movement Series & Class Distribution

Four movement series corresponding to the two target exercises are used, totaling **1,201 raw records**:

| Exercise | Side | Correct | Incorrect | Exceptional / Ambiguous | Total |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Elbow Flexion** | Left Arm | 206 | 43 | 0 | 249 |
| **Elbow Flexion** | Right Arm | 231 | 40 | 0 | 271 |
| *Elbow Flexion Subtotal* | *Both* | *437* | *83* | *0* | *520* |
| **Shoulder Flexion** | Left Arm | 223 | 146 | 1 | 370 |
| **Shoulder Flexion** | Right Arm | 206 | 104 | 1 | 311 |
| *Shoulder Flexion Subtotal* | *Both* | *429* | *250* | *2* | *681* |
| **Grand Total (Raw)** | **All** | **866** | **333** | **2** | **1,201** |

- **Usable Records:** The 2 exceptional/ambiguous records are excluded, leaving **1,199 labeled records** (`866 Correct`, `333 Incorrect`).
- **Binary Classification Only:** IntelliRehabDS contains **no `Incomplete` class records**. Therefore, the Random Forest model is trained strictly as a binary classifier (`Correct` vs. `Incorrect`).

### Subject-Based Train / Test Split

To prevent data leakage across repetitions from the same individual, the 29 participants are split strictly at the participant level (zero overlap):

| Split | Participants | Raw Records | Usable Records | Correct | Incorrect |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Training Set** | 20 | 888 | **886** *(2 exceptional excluded)* | 589 (66.48%) | 297 (33.52%) |
| **Testing Set** | 9 | 313 | **313** | 277 (88.50%) | 36 (11.50%) |
| **Total** | **29** | **1,201** | **1,199** | **866** | **333** |

Within the Training Set, **GroupKFold** cross-validation (grouped by participant) is used for preprocessing, feature selection, and hyperparameter tuning.

---

## 2. Live Experimental Dataset — Camera Track

- **Participants:** **20 adult volunteers** ($\ge 18$ years old):
  - **10 healthy participants**
  - **10 participants with movement limitations** (assessed by a physiotherapist for safe participation)
- **Protocol:** Each participant freely selects **one** of the two exercises (Elbow Flexion or Shoulder Flexion) and performs **5 repetitions**, yielding **100 core repetitions** in total.
- **Ground Truth Labels:** Independently annotated in real time by a physiotherapist (blinded to system outputs) as `Correct`, `Incorrect`, or `Incomplete`.
- **Privacy:** No raw camera video or images are recorded or stored. Only 2D landmark coordinates, computed kinematic features, repetition counts, and anonymized evaluation results are logged for research analysis.
