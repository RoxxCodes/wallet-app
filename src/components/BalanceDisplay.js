function BalanceDisplay({ balance }) {

    return (
        <h2>Balance: ₹{balance ?? "Loading..."}</h2>
    );
}

export default BalanceDisplay;
