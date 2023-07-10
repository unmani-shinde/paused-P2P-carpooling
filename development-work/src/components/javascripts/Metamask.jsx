import React from "react";
import "../stylesheets/Metamask.css";

function MetaMask() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = React.useState(false);

  React.useEffect(() => {
    const isInstalled = () => {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("MetaMask is not installed!");
        setIsMetaMaskInstalled(false);
        return;
      }

      console.log("MetaMask is installed!");
      setIsMetaMaskInstalled(true);
    };

    isInstalled();
  }, []);

  const handleDownloadMetaMask = () => {
    window.open("https://metamask.io/download.html");
  };

  return (
    <div>
      {!isMetaMaskInstalled && (
        <div>
          <p>Please download and install MetaMask to use our platform.</p>
          <button onClick={handleDownloadMetaMask}>Download MetaMask</button>
        </div>
      )}

      {isMetaMaskInstalled && (
        <div>
          <p>You have MetaMask installed.</p>
          {/* Render the rest of your application */}
        </div>
      )}
    </div>
  );
}

export default MetaMask;
