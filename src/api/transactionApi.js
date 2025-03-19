import api from "./api";

export const transact = (walletId, amount, description) => api.post(`/transaction/${walletId}`, { amount, description });
export const getTransactions = (walletId, skip, limit) => api.get(`/transaction?walletId=${walletId}&skip=${skip}&limit=${limit}`);
