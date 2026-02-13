<div align="center">
  <h1 align="center">Justuno frontend</h1>
  <p align="center">Keep track of played uno games and view player standings over time. </br>
    Build with <a href="https://reactjs.org/" target="_blank">React</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>, self-hostable using docker.
  </p>
  <p>
    <img src="https://github.com/stenterstal/justuno-frontend/actions/workflows/docker.yaml/badge.svg">
  </p>
</div>

# 🐳 Docker Compose
See <a href="https://github.com/stenterstal/justuno-frontend/blob/main/docker-compose-traefik.yaml">docker-compose-traefik.yaml</a>. Delete traefik labels if not used.

# 🛠️ Developing
Make sure you have the <a href="https://github.com/stenterstal/justuno-backend" target="_blank">backend</a> running.
```bash
# 1. Clone this repo
git clone https://github.com/stenterstal/justuno-frontend.git

# 2. Install dependencies
npm install

# 3. Start
npm run dev
```
### Environment
- Development: looks for the backend on <i>localhost:8000</i>
- Production: expects the backend to run on the same domain (see <a href="https://github.com/stenterstal/justuno-frontend/blob/main/nginx.conf#L18">nginx.conf</a>)