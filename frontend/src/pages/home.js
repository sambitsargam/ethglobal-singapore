import React, { useState, useEffect } from 'react';
import { Button, Label } from '@windmill/react-ui';
import { IDKitWidget, VerificationLevel } from '@worldcoin/idkit'

// MetaMask connection handler
const connectMetaMask = async () => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      return accounts[0];
    } catch (error) {
      console.error('Error connecting to MetaMask:', error);
      return null;
    }
  } else {
    alert('MetaMask is not installed. Please install it to connect.');
    return null;
  }
};

// Mina (Auro Wallet) connection handler
const connectMinaWallet = async () => {
  if (typeof window.mina !== 'undefined') {
    try {
      const accounts = await window.mina.requestAccounts();
      if (Array.isArray(accounts)) {
        return accounts[0];
      }
      return null;
    } catch (error) {
      console.error('Error connecting to Mina (Auro Wallet):', error);
      return null;
    }
  } else {
    alert('Auro Wallet is not installed');
    return null;
  }
};

// Function to generate a random 10-digit ID
const generateId = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
};

// Function to save user ID and asset data to Firebase
const saveToFirebase = async (data) => {
  const url = 'https://zkzk-35d2f-default-rtdb.firebaseio.com/data.json';
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Failed to save data');
    }
    console.log('Data saved successfully:', await response.json());
  } catch (error) {
    console.error('Error saving data to Firebase:', error);
  }
};

function Home() {
  const [metaMaskAddress, setMetaMaskAddress] = useState('');
  const [minaAddress, setMinaAddress] = useState('');
  const [metaMaskConnected, setMetaMaskConnected] = useState(false);
  const [minaConnected, setMinaConnected] = useState(false);
  const [userId, setUserId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [verified, setVerified] = useState(false);

  // Handle MetaMask connection
  const handleMetaMaskConnect = async () => {
    const address = await connectMetaMask();
    if (address) {
      setMetaMaskAddress(address);
      setMetaMaskConnected(true);
    }
  };

  // Handle Mina (Auro Wallet) connection
  const handleMinaConnect = async () => {
    const address = await connectMinaWallet();
    if (address) {
      setMinaAddress(address);
      setMinaConnected(true);
    }
  };

  // Watch for account changes in Mina Wallet
  useEffect(() => {
    if (window.mina) {
      window.mina.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setMinaAddress(accounts[0]);
        }
      });
    }
  }, []);

  const bothWalletsConnected = metaMaskConnected && minaConnected;

  // Handle the "Proceed" button click
  const handleProceed = () => {
    const id = generateId();
    const assetData = {
      assetType: [
        {
          assetType: "Stable Coin",
          polygon: 5000,
          ethereum: 3000,
          mina: 2000,
          other: 1000,
        },
        {
          assetType: "NFT",
          polygon: 10,
          ethereum: 5,
          mina: 2,
          other: 1,
        },
        {
          assetType: "Token",
          polygon: 15000,
          ethereum: 10000,
          mina: 5000,
          other: 2000,
        },
      ],
    };

    const dataToSave = {
      id,
      assetData,
    };

    saveToFirebase(dataToSave);
    setUserId(id);  // Set the user ID
    setIsSubmitted(true); // Mark the form as submitted
  };

  // Handle World ID verification success
  const enableButton = () => {
    setVerified(true); // Enable the proceed button
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Connect Your Wallets
              </h1>

              {!metaMaskConnected && (
                <Button onClick={handleMetaMaskConnect} block className="mt-4">
                  Connect MetaMask
                </Button>
              )}

              {!minaConnected && (
                <Button onClick={handleMinaConnect} block className="mt-4">
                  Connect Mina Wallet
                </Button>
              )}

              {bothWalletsConnected && (
                <>
                  <Label className="mt-4">
                    <span>MetaMask Wallet Address: {metaMaskAddress}</span>
                  </Label>
                  <Label className="mt-4">
                    <span>Mina Wallet Address: {minaAddress}</span>
                  </Label>

                  <IDKitWidget
                    app_id="app_GBkZ1KlVUdFTjeMXKlVUdFT"
                    action="unique_person"
                    onSuccess={enableButton} // Call enableButton on success
                    verification_level={VerificationLevel.Device} // or "device"

                  >
                    {({ open }) => <Button onClick={open} className="mt-4">Verify with World ID to Generate Wealth</Button>}
                  </IDKitWidget>

                  {verified && (
                    <Button onClick={handleProceed} block className="mt-4">
                      Submit Analysis Report
                    </Button>
                  )}
                </>
              )}

              {isSubmitted && (
                <Label className="mt-4 text-green-500">
                  User ID: {userId} - Done
                </Label>
              )}

              {!bothWalletsConnected && (
                <Label className="mt-4 text-red-500">
                  Both wallets must be connected to proceed.
                </Label>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;
