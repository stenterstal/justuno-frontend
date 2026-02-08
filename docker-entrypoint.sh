#!/bin/sh

# Replace placeholders in config.js with environment variables
CONFIG_FILE=/usr/share/nginx/html/config.js

if [ -f "$CONFIG_FILE" ]; then
  echo "Overwriting runtime config..."
  cat <<EOF > $CONFIG_FILE
window._env_ = {
  API_BASE_URL: "${API_BASE_URL}"
};
EOF
fi

# Start nginx
exec "$@"
