<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
=======
# Frontend DevOps Project — Healthcare Dashboard

A production-ready React web application containerized using a **multi-stage Docker build** (Node.js + NGINX Alpine) and deployed automatically via a **Jenkins CI/CD Pipeline**.

---

## 🏗️ DevOps Architecture

```
GitHub Push (main branch)
    │
    ▼
Jenkins Pipeline (CI/CD)
    │
    ├── 1. Clone Repository
    ├── 2. Install Dependencies (npm install)
    ├── 3. Lint & Validate Code
    ├── 4. Build Production Artifacts (npm run build ➔ /dist)
    ├── 5. Multi-Stage Docker Build (Node.js 22 Builder ➔ NGINX Alpine)
    ├── 6. Push Container Image to Docker Hub (ahish2006/devops-frontend)
    └── 7. Deploy NGINX Container on Port 80
```

---

## 🛠️ Tech Stack & DevOps Tools

| Category | Tool / Framework |
|---|---|
| **Frontend Framework** | React 19, Vite, React Router |
| **Web Server** | NGINX Alpine (Gzip + SPA Fallback Routing) |
| **Containerization** | Docker (Multi-stage build, ~20MB image) |
| **CI/CD Automation** | Jenkins (7-stage pipeline) |
| **Registry** | Docker Hub (`ahish2006/devops-frontend`) |
| **Version Control** | Git, GitHub |

---

## 🚀 How to Run Locally

### Option A: Using Docker Compose
```bash
docker-compose up -d
```
Visit `http://localhost` in your browser.

### Option B: Using Docker CLI
```bash
# Build image
docker build -t devops-frontend .

# Run container
docker run -d -p 80:80 --name devops-frontend devops-frontend
```

---

## 🔐 Demo User Credentials

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| User | `user` | `user123` |
>>>>>>> bf55af404b7a7e2901306f7994de85321248f35c
