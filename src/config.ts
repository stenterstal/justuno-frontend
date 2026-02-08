interface Window {
  _env_?: {
    API_BASE_URL?: string;
    [key: string]: any;
  };
}

export const API_BASE_URL = (window as Window)._env_?.API_BASE_URL|| "http://10.10.20.50:8000";