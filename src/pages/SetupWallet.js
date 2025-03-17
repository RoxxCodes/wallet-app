import { useState } from "react";
import { createWallet } from "../api/walletApi";

function SetupWallet() {
    const [name, setName] = useState("");
    const [balance, setBalance] = useState(0);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (parseFloat(balance) < 0) {
            setError("Balance cannot be negative.");
            return;
        }

        try {
            const response = await createWallet(name, balance);
            sessionStorage.setItem("walletId", response.data.id);

            window.location.reload();
        } catch (err) {
            setError("Failed to create wallet. Please try again.");
        }
    };


    return (
        <div>
            <h1>Setup Wallet</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Wallet Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="Balance" value={balance} onChange={(e) => setBalance(e.target.value)} />
                <button type="submit">Create Wallet</button>
            </form>
        </div>
    );
}
export default SetupWallet;
