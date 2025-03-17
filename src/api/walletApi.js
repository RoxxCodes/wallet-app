import axios from "axios";
import { API_BASE_URL } from "./Constants";

export const createWallet = (name, balance) => axios.post(`${API_BASE_URL}/wallet/setup`, { name, balance });
export const getWallet = (walletId) => axios.get(`${API_BASE_URL}/wallet/${walletId}`);

