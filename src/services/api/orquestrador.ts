import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_ORQUESTRADOR_VALIDAR_TOKEN
});

export default api;
