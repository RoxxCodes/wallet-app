import api from "./api";

export const createWallet = (name, balance) => api.post(`/wallet/setup`, { name, balance });
export const getWallet = (walletId) => api.get(`/wallet/${walletId}`);

