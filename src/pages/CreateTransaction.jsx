import { useContext } from "react";
import { WalletContext } from "../context/WalletProvider";
import TransactionForm from "../components/TransactionForm"
import BalanceDisplay from "../components/BalanceDisplay";

const CreateTransaction = () => {
    const { wallet } = useContext(WalletContext);
    return (
        <div>
            <BalanceDisplay balance={wallet?.balance} />
            <TransactionForm walletId={wallet?.id} balance={wallet?.balance} />
        </div>
    );
}
export default CreateTransaction;
