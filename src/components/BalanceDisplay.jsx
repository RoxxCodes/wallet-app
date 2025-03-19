import BigNumber from "bignumber.js";
import "../styles/BalanceDisplay.css";


const BalanceDisplay = ({ balance }) => {
    return (
        <h2 className="balance-container">
            Balance: ₹<span className={balance !== undefined ? "" : "balance-loading"}>
                {new BigNumber(balance).toFormat(4) ?? "Loading..."}
            </span>
        </h2>
    );
}

export default BalanceDisplay;
