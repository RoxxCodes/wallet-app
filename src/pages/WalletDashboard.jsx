import { useEffect, useContext, useRef } from "react";
import { WalletContext } from "../context/WalletProvider";
import { useNavigate } from "react-router-dom";
import TransactionsList from "../components/TransactionsList";
import BalanceDisplay from "../components/BalanceDisplay";
import "../styles/WalletDashboard.css";


const WalletDashboard = () => {
    const exportCsvRef = useRef(null);
    const { wallet, fetchWallet } = useContext(WalletContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWallet();
    }, []);

    const handleExportCSV = () => {
        if (exportCsvRef.current) {
            exportCsvRef.current();
        }
    };

    return (
        <div className="dashboard-container">
        <h1>Wallet Dashboard</h1>
        <BalanceDisplay balance={wallet?.balance} />
        <div className="button-group">
            <button onClick={() => navigate("/create-transaction")}>Add Transaction</button>
            <button onClick={handleExportCSV}>Download CSV</button>
        </div>
        {wallet ? <TransactionsList walletId={wallet.id} exportCsvRef={exportCsvRef} /> : <p>Loading wallet...</p>}
    </div>
    );
}
export default WalletDashboard;
