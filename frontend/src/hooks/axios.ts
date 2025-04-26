import Axios from "axios";

export const axios = Axios.create({
    baseURL: import.meta.env.BACKEND_URL || 'http://localhost:8000/api'
});