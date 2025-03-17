import { useEffect, useContext } from "react";
import { WalletContext } from "../context/WalletProvider";
import { useNavigate } from "react-router-dom";
import TransactionsList from "../components/TransactionsList";
import BalanceDisplay from "../components/BalanceDisplay";

function WalletDashboard() {
    const { wallet, fetchWallet } = useContext(WalletContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchWallet();
    }, []);

    return (
        <div>
            <h1>Wallet Dashboard</h1>
            <BalanceDisplay balance={wallet?.balance} />
            {wallet ? (
                <>
                    <button onClick={() => navigate("/create-transaction")}>Add Transaction</button>
                    <TransactionsList walletId={wallet.id} />
                </>
            ) : (
                <p>Loading wallet...</p>
            )}
        </div>
    );
}
export default WalletDashboard;
