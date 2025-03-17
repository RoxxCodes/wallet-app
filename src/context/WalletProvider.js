import { createContext, useState, useEffect, useRef } from "react";
import { getWallet } from "../api/walletApi";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  const fetchWallet = async () => {
    const storedWalletId = sessionStorage.getItem("walletId");
    if (!storedWalletId) {
      return;
    }

    try {
      const res = await getWallet(storedWalletId);
      setWallet(res.data);
    } catch (error) {
      console.error("Failed to fetch wallet:", error);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  return (
    <WalletContext.Provider value={{ wallet, setWallet, fetchWallet }}>
      {children}
    </WalletContext.Provider>
  );
}
