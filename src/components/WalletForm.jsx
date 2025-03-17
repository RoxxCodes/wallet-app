import { useState } from "react";
import { createWallet } from "../api/walletApi";
import "../styles/WalletForm.css";

const WalletForm = ({ onWalletCreated }) => {
    const [name, setName] = useState("");
    const [balance, setBalance] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("Wallet name cannot be empty.");
            return;
        }

        if (parseFloat(balance) < 0) {
            setError("Balance cannot be negative.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await createWallet(name, parseFloat(balance) || 0);
            sessionStorage.setItem("walletId", response.data.id);
            onWalletCreated();
        } catch (err) {
            setError("Failed to create wallet. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="setup-container">
            <form onSubmit={handleSubmit} className="setup-form">
                <h2 className="setup-heading">Setup Wallet</h2>
                {error && <p className="error-message">{error}</p>}
                <input
                    type="text"
                    placeholder="Wallet Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="setup-input"
                />
                <input
                    type="number"
                    placeholder="Balance"
                    value={balance}
                    onChange={(e) => setBalance(e.target.value)}
                    className="setup-input"
                />
                <button type="submit" className="setup-button" disabled={loading}>
                    {loading ? "Creating..." : "Create Wallet"}
                </button>
            </form>
        </div>
    );
}

export default WalletForm;
