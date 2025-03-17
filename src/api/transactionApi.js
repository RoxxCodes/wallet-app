import axios from "axios";
const API_BASE_URL = "http://localhost:3000/api/v1";

export const transact = (walletId, amount, description) => axios.post(`${API_BASE_URL}/transaction/${walletId}`, { amount, description });
export const getTransactions = (walletId, skip, limit) => axios.get(`${API_BASE_URL}/transaction?walletId=${walletId}&skip=${skip}&limit=${limit}`);
