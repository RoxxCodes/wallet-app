import "../styles/BalanceDisplay.css";

const BalanceDisplay = ({ balance }) => {
    return (
        <h2 className="balance-container">
            Balance: ₹<span className={balance !== undefined ? "" : "balance-loading"}>
                {balance ?? "Loading..."}
            </span>
        </h2>
    );
}

export default BalanceDisplay;
