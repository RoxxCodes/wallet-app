import { useState } from "react";
import { createWallet } from "../api/walletApi";
function WalletForm({ onWalletCreated }) {
    const [name, setName] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await createWallet(name);
        onWalletCreated(response.data);
    };
    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter Wallet Name" value={name} onChange={(e) => setName(e.target.value)} />
            <button type="submit">Create Wallet</button>
        </form>
    );
}
export default WalletForm;
