# RehabPose

Real-time rehabilitation exercise pose estimation, calibration, and movement evaluation platform.

## Project Structure

- `client/` — Next.js frontend (exercise selection, camera feed, calibration, live session, results)
- `server/` — Python backend (MediaPipe pose estimation, feature extraction, calibration, rule-based & Random Forest evaluation)
- `data/` — Datasets (IntelliRehabDS), processed data, and test samples
- `models/` — Trained ML models and metadata
- `results/` — Evaluation metrics, reports, and plots
- `docs/` — Architecture, methodology, API, and protocol documentation

See [ARCHITECTURE.md](./ARCHITECTURE.md) for system design details.

## Getting Started

### 1. Backend (`server/`)

```bash
cd server
# Activate virtual environment (Windows PowerShell)
.\.venv\Scripts\Activate.ps1
# Install dependencies
pip install -r requirements.txt
# Copy environment variables (if .env does not exist yet)
copy .env.example .env
# Start the API server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Health check: `http://127.0.0.1:8000/api/health`

### 2. Frontend (`client/`)

```bash
cd client
npm install
# Copy environment variables (if .env.local does not exist yet)
copy .env.example .env.local
# Start the development server
npm run dev
```

Frontend URL: `http://localhost:3000`
