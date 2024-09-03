import axios from 'axios';
import md5 from 'md5';

const env = import.meta.env;

const TIME = Number(new Date())

const URL = env.VITE_API_URL;
const PUBLIC_KEY = env.VITE_PUBLIC_KEY;
const PRIVATE_KEY = env.VITE_PRIVATE_KEY;

const api = axios.create({
    baseURL: URL,
    headers: {
        get: { "Accept-Encoding": "gzip,deflate,compress" }
    },
    params: { 
        ts: TIME,
        apikey: PUBLIC_KEY,
        hash: md5(`${TIME}${PRIVATE_KEY}${PUBLIC_KEY}`)
    }
});

api.interceptors.request.use(
    async config => {
        try {
            return config;
        } catch (e) {
            return config;
        }
    },
    error => {
        return Promise.reject(error);
    },
);

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    },
);

export default api;