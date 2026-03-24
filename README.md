# StabilityIQ – Personal Financial Health Intelligence Platform

Production-style full-stack demo fintech app with React + Tailwind + Recharts + Framer Motion frontend and FastAPI backend.

## Features
- Auth flow (login/signup/demo/forgot password mock)
- Dashboard with financial cards, risk gauge, charts and insights
- Transactions with search/filter + add mock transaction
- Insights, Risk Analysis, Recommendations pages
- Settings/profile page with consent management + privacy modal
- Dark/light mode
- Loading, error, and empty states
- Dummy financial data generation and REST APIs

## Project Structure
- `frontend/`
  - `src/components`
  - `src/pages`
  - `src/services`
  - `src/hooks`
- `backend/`
  - `main.py`
  - `routes/`
  - `services/`
  - `data/`

## Run locally

### 1) Backend
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

Optionally set API url:
```bash
echo "VITE_API_BASE_URL=http://localhost:8000" > frontend/.env
```

Open: `http://localhost:5173`

## Mock APIs
- `POST /login`
- `POST /signup`
- `GET /transactions`
- `POST /transactions`
- `GET /summary`
- `GET /risk`
- `GET /insights`
- `GET /recommendations`
