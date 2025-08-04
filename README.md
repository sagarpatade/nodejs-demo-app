# Node.js Demo App CI/CD Pipeline

## 🚀 Objective
This repository demonstrates a complete **CI/CD pipeline** for a Node.js web application using **GitHub Actions**, **Docker**, and **DockerHub**.  
On every push to `main`, the pipeline:
1. Installs dependencies
2. Starts the app and runs a smoke test
3. Builds a Docker image
4. Pushes the image to DockerHub with `latest` and commit SHA tags

## 📦 Technologies / Tools
- Node.js (v20)
- Docker
- GitHub Actions (CI/CD workflow)
- DockerHub (image registry)

## 📈 Status
![CI](https://github.com/sagarpatade/nodejs-demo-app/actions/workflows/main.yml/badge.svg)

## 🔧 Repository Structure

.
├── app.js # Minimal Node.js HTTP app
├── package.json # NPM manifest and scripts
├── test/
│ └── test.js # Simple smoke test
├── Dockerfile # Docker image definition
├── .github/
│ └── workflows/
│ └── main.yml # GitHub Actions CI/CD pipeline
└── README.md



## ⚙️ Setup & Configuration

### 1. Create DockerHub Repository
- Create a repo on DockerHub, e.g.: `sagarpatade1900/nodejs-demo-app`.

### 2. Add GitHub Secrets
In your GitHub repository (`sagarpatade/nodejs-demo-app`) go to:
**Settings → Secrets and variables → Actions → New repository secret**

Add the following:

- `DOCKERHUB_USERNAME` = your DockerHub username (e.g., `sagarpatade1900`)  
- `DOCKERHUB_PASSWORD` = DockerHub access token (create a new one from DockerHub; do **not** commit credentials in code)

### 3. Pipeline Trigger
The workflow is defined in `.github/workflows/main.yml` and triggers automatically on:
```yaml
on:
  push:
    branches:
      - main

🧪 What the Workflow Does
Checks out the repository

Sets up Node.js and caches npm

Installs dependencies (npm ci)

Starts the Node app in background and waits

Runs the smoke test (npm test)

Sets up Docker buildx (and QEMU for multi-platform support)

Logs into DockerHub using secrets

Builds and pushes the Docker image with tags:

latest

Commit SHA (for traceability)

🏃‍♂️ Running Locally
Install dependencies and run the app:

bash
Copy
Edit
npm ci
node app.js
Test the app (in another terminal):

bash
Copy
Edit
curl http://localhost:3000/
# Expected: {"message":"Hello from Node.js CI/CD demo!"}
Run the built-in smoke test:

bash
Copy
Edit
node test/test.js
Build & run the Docker image locally:

bash
Copy
Edit
docker build -t local-node-demo .
docker run -p 3000:3000 local-node-demo
curl http://localhost:3000/
📦 Pulling the Image from DockerHub
After a successful pipeline run, pull the image:

bash
Copy
Edit
docker pull sagarpatade1900/nodejs-demo-app:latest
docker run -p 3000:3000 sagarpatade1900/nodejs-demo-app:latest
curl http://localhost:3000/
🛠 Scripts (from package.json)
npm start – starts the Node.js app (node app.js)

npm test – runs the simple smoke test (node test/test.js)

✅ Sample Response
Visiting the root endpoint returns:

json
Copy
Edit
{ "message": "Hello from Node.js CI/CD demo!" }
📌 Notes / Stretch Goals
These were beyond the immediate deliverable but are natural extensions:

Replace the current smoke test with a full test suite (e.g., Jest/Mocha)

Automatic deployment to a server (e.g., EC2) after image push

Health check and rollback on failed deployments

Semantic version tagging of Docker images

Promotion between environments (dev → prod)

Add badges for Docker image availability or deployment status

🧩 Internship Task Summary
Task: Automate code deployment using a CI/CD pipeline.
Tools used: GitHub Actions, Node.js, Docker, DockerHub
Outcome: On push to main, the pipeline builds, tests, containerizes, and publishes the app image automatically.

📚 References
GitHub Actions: CI/CD pipeline configuration

DockerHub: Container registry for image hosting

Node.js: Runtime for the sample app
