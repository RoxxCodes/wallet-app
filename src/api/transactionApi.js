import axios from "axios";
import { API_BASE_URL } from "./Constants";

export const transact = (walletId, amount, description) => axios.post(`${API_BASE_URL}/transaction/${walletId}`, { amount, description });
export const getTransactions = (walletId, skip, limit) => axios.get(`${API_BASE_URL}/transaction?walletId=${walletId}&skip=${skip}&limit=${limit}`);
