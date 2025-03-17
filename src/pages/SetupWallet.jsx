import WalletForm from "../components/WalletForm";

const SetupWallet = () => {
    const handleWalletCreated = () => {
        window.location.reload();
    };

    return (
        <div className="setup-container">
            <WalletForm onWalletCreated={handleWalletCreated} />
        </div>
    );
}

export default SetupWallet;
