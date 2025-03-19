import { Routes, Route, Navigate } from "react-router-dom";
import WalletDashboard from "./pages/WalletDashboard";
import SetupWallet from "./pages/SetupWallet";
import CreateTransaction from "./pages/CreateTransaction";
import ServerErrorPage from "./pages/ServerErrorPage";

function App() {

  const walletId = localStorage.getItem("walletId");

  return (
      <Routes>
        <Route path="/" element={walletId ? <WalletDashboard /> : <SetupWallet />} />
        <Route path="/create-transaction" element={walletId ? <CreateTransaction /> : <Navigate to="/" />} />
        <Route path="/server-error" element={<ServerErrorPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

  );
}

export default App;
