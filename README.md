<div align="center">
  <h1 align="center">Justuno frontend</h1>
  <p align="center">Keep track of played uno games and view player standings over time. </br>
    Build with <a href="https://reactjs.org/" target="_blank">React</a> and <a href="https://tailwindcss.com/" target="_blank">Tailwind</a>, self-hostable using docker.
  </p>
  <p>
    <img src="https://github.com/stenterstal/justuno-frontend/actions/workflows/docker.yaml/badge.svg">
    <a href="https://github.com/stenterstal/justuno-frontend/pkgs/container/justuno-frontend">
      <img src="https://img.shields.io/badge/ghcr-justuno--frontend-blue?logo=github" />
    </a>
    <a href="https://github.com/stenterstal/justuno-frontend/releases">
      <img src="https://img.shields.io/github/v/release/stenterstal/justuno-frontend?logo=github" />
    </a>
    <a href="https://github.com/stenterstal/justuno-frontend/blob/main/LICENSE">
      <img src="https://img.shields.io/github/license/stenterstal/justuno-frontend?logo=github" />
    </a>
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
- Development: the Vite dev server proxies `/api` to the backend on <i>localhost:8000</i>, so `npm run dev -- --host` also works from other devices on the network
- Production: expects the backend to run on the same domain (see <a href="https://github.com/stenterstal/justuno-frontend/blob/main/nginx.conf#L18">nginx.conf</a>)

# 🚀 Releasing
Docker images are built by the <a href="https://github.com/stenterstal/justuno-frontend/blob/main/.github/workflows/docker.yaml">Build workflow</a>, which runs when a GitHub release is **published**.

1. Push the changes you want to release to `main`.
2. Create a release with a new tag in `MAJOR.MINOR.PATCH` format, without a `v` prefix (e.g. `1.0.4`):
   - **GitHub:** *Releases* → *Draft a new release* → *Choose a tag*, type the new version and pick *Create new tag on publish* (target `main`) → *Generate release notes* → *Publish release*
   - **CLI:** `gh release create 1.0.4 --target main --generate-notes`
3. Follow the build in the *Actions* tab. When it finishes, `ghcr.io/stenterstal/justuno-frontend` has two new tags: `1.0.4` and `latest`.
4. Update the server:
   ```bash
   docker compose pull && docker compose up -d
   ```

Notes:
- Saving a release as a draft does not start a build, only publishing does.
- *Run workflow* in the Actions tab (manual trigger) rebuilds from a branch and only updates `latest`, without a version tag.
- The compose file uses `latest` for both images. When a change touches the API, release the <a href="https://github.com/stenterstal/justuno-backend">backend</a> too so both images match.
