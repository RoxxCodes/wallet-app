import { createContext, useState, useEffect } from "react";
import { getWallet } from "../api/walletApi";

export const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = useState(null);

  const fetchWallet = async () => {
    const storedWalletId = sessionStorage.getItem("walletId");
    if (storedWalletId) {
      const res = await getWallet(storedWalletId);
      setWallet(res.data);
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
