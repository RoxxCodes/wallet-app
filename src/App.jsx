import { Routes, Route, Navigate } from "react-router-dom";
import WalletDashboard from "./pages/WalletDashboard";
import SetupWallet from "./pages/SetupWallet";
import CreateTransaction from "./pages/CreateTransaction";

function App() {
  const walletId = sessionStorage.getItem("walletId");
  return (
    <div>
      <Routes>
        <Route path="/" element={walletId ? <WalletDashboard /> : <SetupWallet />} />
        <Route path="/create-transaction" element={walletId ? <CreateTransaction /> : <Navigate to="/" />} />
        <Route path="*" element={<Navigate to="/" />} />  {/* Catch-all redirects to home */}
      </Routes>
    </div>
  );
}

export default App;
