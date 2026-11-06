# Patch notes 0.2

This release tightens the Docker and nginx setup. Most of the changes need action when you upgrade an existing deployment that uses `docker-compose-traefik.yaml`.

## Breaking changes

### `DJANGO_SECRET_KEY` is now set in the compose file
The backend image runs in production mode and won't start without a secret key. The compose file now reads the key from your environment:

```yaml
DJANGO_SECRET_KEY: ${DJANGO_SECRET_KEY}
```

**What to do:** generate a key and add it to the `.env` file next to your compose file:

```sh
python -c "import secrets; print(secrets.token_urlsafe(50))"
```

```
DJANGO_SECRET_KEY=<your generated key>
```

### `ALLOWED_HOSTS` must contain your domain
`ALLOWED_HOSTS` used to be `localhost`. Requests that come in through your domain were rejected by Django with `400 Bad Request`. The compose file now uses a placeholder:

```yaml
ALLOWED_HOSTS: yourdomain.com
```

**What to do:** replace `yourdomain.com` with the domain from your Traefik `Host(...)` rule. You don't need to list `localhost`; the backend always allows it. Separate multiple domains with commas.

### The Django admin can only be reached from the server itself
The admin port used to listen on every network interface (`8888:8000`). Docker writes its own firewall rules, so the admin was reachable from the internet even with ufw or firewalld enabled. The port is now bound to localhost:

```yaml
ports:
  - 127.0.0.1:8888:8000
```

**What to do:** reach the admin through an SSH tunnel:

```sh
ssh -L 8888:localhost:8888 yourserver
```

Then open `http://localhost:8888/admin` in your browser.

### Your mounted `nginx.conf` is not updated automatically
The compose file mounts `./config/nginx.conf` over the config built into the image. Your server keeps using its old copy until you replace it.

**What to do:** copy the new [`nginx.conf`](../nginx.conf) to `./config/nginx.conf` on your server, or remove the volume mount to use the config built into the image. Then check it:

```sh
docker compose exec frontend nginx -t
```

### Only `/api/` is proxied to the backend
nginx used to forward any path starting with `/api`, including `/api-docs` or `/apifoo`. Now it only forwards paths under `/api/`. The frontend only uses `/api/...`, so the app itself isn't affected.

**What to do:** nothing, unless you call other backend paths through the frontend's domain.

### Missing files in `/assets/` now return 404
A request for a file in `/assets/` that doesn't exist used to return `index.html` with status `200`. Now it returns `404`. Old browser tabs that ask for files from a previous build now get a clear 404 instead of a confusing error.

**What to do:** nothing.

### Client IPs are read from Traefik
nginx now takes the visitor's real IP from the `X-Forwarded-For` header, but only when the request comes from `172.16.0.0/12`, Docker's default network range.

**What to do:** if your Traefik network uses a different subnet, change `set_real_ip_from` in `nginx.conf`. Otherwise the backend sees Traefik's IP for every request.

## Removed settings
These lines are gone from the compose file. They had no effect, so removing them changes nothing:

- `CORS_ALLOWED_HOSTS`: the backend reads `CORS_ALLOWED_ORIGINS`. The frontend and API share a domain, so CORS isn't needed.
- `API_BASE_URL` (frontend): the API URL is fixed when the frontend is built (`VITE_API_BASE_URL`), so a runtime variable has no effect.

## Upgrade checklist
1. Add `DJANGO_SECRET_KEY` to your `.env`.
2. Set `ALLOWED_HOSTS` to your domain.
3. Replace `./config/nginx.conf` on the server, or remove the mount.
4. Check `set_real_ip_from` if your Traefik network isn't in `172.16.0.0/12`.
5. Run `docker compose up -d`, then `docker compose exec frontend nginx -t`.
