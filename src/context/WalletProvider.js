import { createContext, useState, useEffect, useRef } from "react";
import { getWallet } from "../api/walletApi";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);
  const [walletNotFound, setWalletNotFound] = useState(false);

  const fetchWallet = async () => {
    const storedWalletId = localStorage.getItem("walletId");
    if (!storedWalletId) {
      return;
    }

    try {
      const res = await getWallet(storedWalletId);
      setWallet(res.data);
    } catch (error) {
      if (error.response?.status === 404) {
        setWalletNotFound(true);
      }
      console.error("Failed to fetch wallet:", error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, setWallet, fetchWallet, walletNotFound }}>
      {children}
    </WalletContext.Provider>
  );
}
