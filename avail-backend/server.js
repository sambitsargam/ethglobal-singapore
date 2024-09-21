require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cron = require('node-cron');

const app = express();
const PORT = process.env.PORT || 5000;

let lastTransactionHash = null;
let lastTransactionTimestamp = null;

// Function to fetch the wallet address from Firebase
const fetchWalletAddress = async () => {
  try {
    const response = await axios.get('https://zkzk-35d2f-default-rtdb.firebaseio.com/ss.json');
    return response.data.walletAddress; // Adjust this if your JSON structure is different
  } catch (error) {
    console.error('Error fetching wallet address:', error.message);
    return null;
  }
};

// Function to fetch new transactions for a given wallet address
const fetchTransactions = async (walletAddress) => {
  try {
    const response = await axios.post('https://avail-turing.api.subscan.io/api/scan', {
      address: walletAddress,
    }, {
      headers: {
        'X-API-Key': process.env.API_KEY,
      },
    });

    const transactions = response.data.data;

    if (transactions && transactions.length > 0) {
      transactions.forEach(tx => {
        const timestamp = new Date(tx.timestamp); // Adjust if needed

        if (lastTransactionTimestamp && Math.abs(timestamp - lastTransactionTimestamp) <= 10000) { // 10 seconds
          sendEmail(tx); // Call function to send email
        }

        lastTransactionHash = tx.hash;
        lastTransactionTimestamp = timestamp; // Update the last transaction timestamp
      });
    }
  } catch (error) {
    console.error('Error fetching transactions:', error.response ? error.response.data : error.message);
  }
};

// Function to send an email with transaction details
const sendEmail = async (transactionData) => {
  try {
    const response = await axios.post('https://sambit-email.vercel.app/send', {
      to: 'recipient@example.com', // Replace with the actual recipient's email
      subject: 'New Transaction Alert',
      body: JSON.stringify(transactionData, null, 2), // Format the body as needed
    });
    console.log('Email sent:', response.data);
  } catch (error) {
    console.error('Error sending email:', error.message);
  }
};

// Schedule a task to run every 10 seconds
cron.schedule('*/10 * * * * *', async () => {
  const walletAddress = await fetchWalletAddress();
  if (walletAddress) {
    console.log('Fetching transactions for', walletAddress);
    fetchTransactions(walletAddress);
  } else {
    console.log('No wallet address found.');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
