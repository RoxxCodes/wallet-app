import { useState } from "react";
import { transact } from "../api/transactionApi";
import { useNavigate } from "react-router-dom";
function TransactionForm({ walletId, balance }) {
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

        await transact(walletId, transactionAmount, description);
        navigate("/");
    };

    return (
        <div>
            <h1>Create Transaction</h1>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <select value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                </select>
                <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
export default TransactionForm;
