import { useEffect, useContext, useRef } from "react";
import { WalletContext } from "../context/WalletProvider";
import { useNavigate } from "react-router-dom";
import TransactionsList from "../components/TransactionsList";
import BalanceDisplay from "../components/BalanceDisplay";
import "../styles/WalletDashboard.css";


const WalletDashboard = () => {
    const exportCsvRef = useRef(null);
    const { wallet, fetchWallet, walletNotFound } = useContext(WalletContext);

    const navigate = useNavigate();

    useEffect(() => {
        fetchWallet();
    }, []);

    const handleExportCSV = () => {
        if (exportCsvRef.current) {
            exportCsvRef.current();
        }
    };

    const createWallet = () => {
        localStorage.removeItem("walletId");
        window.location.reload();
    }

    return (
        <div className="dashboard-container">
        <h1>Wallet Dashboard</h1>
        { wallet ? (
            <>
                <BalanceDisplay balance={wallet?.balance} />
                <div className="button-group">
                    <button disabled={!wallet} onClick={() => navigate("/create-transaction")}>Add Transaction</button>
                    <button disabled={!wallet} onClick={handleExportCSV}>Download CSV</button>
                </div>
                <TransactionsList walletId={wallet.id} exportCsvRef={exportCsvRef} />
            </>
        ): walletNotFound ? (
            <div>
                    <p>Wallet not found. Create a new wallet.</p>
                    <button onClick={createWallet}>Create New Wallet</button>
                </div>
        ) : (
            <p>Loading wallet...</p>
        )}
        
    </div>
    );
}
export default WalletDashboard;
