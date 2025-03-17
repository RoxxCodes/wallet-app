import { useState } from "react";
import { transact } from "../api/transactionApi";
import { useNavigate } from "react-router-dom";
import "../styles/TransactionForm.css";

const TransactionForm = ({ walletId, balance }) => {
    const [amount, setAmount] = useState("");
    const [type, setType] = useState("credit");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const transactionAmount = type === "debit" ? -Math.abs(Number(amount)) : Math.abs(Number(amount));

        if (Number(balance) + Number(transactionAmount) < 0) {
            setError("Insufficient balance.");
            return;
        }

        try {
            await transact(walletId, transactionAmount, description);
            setError("");
            navigate("/");
        } catch (error) {
            const errorMessage = error.response?.data?.error || "Failed to create transaction. Please try again.";
            setError(errorMessage);
        }
    };

    return (
        <div className="transaction-container">
            <h1>Create Transaction</h1>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit} className="transaction-form">
                <input 
                    type="number" 
                    placeholder="Amount" 
                    value={amount} 
                    onChange={(e) => setAmount(e.target.value)} 
                    required
                />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
                <input 
                    type="text" 
                    placeholder="Description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
export default TransactionForm;
