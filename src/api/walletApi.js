import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api/v1";
export const createWallet = (name, balance) => axios.post(`${API_BASE_URL}/wallet/setup`, { name, balance });
export const getWallet = (walletId) => axios.get(`${API_BASE_URL}/wallet/${walletId}`);

