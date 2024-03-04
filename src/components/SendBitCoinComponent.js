import React, { useState } from 'react';
import { Button, TextField, Card, CardContent, Box, Grid, Typography } from '@mui/material';
import axios from 'axios';

const Api="http://localhost:9090"

function SendBitcoinComponent() {
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [transactionResult, setTransactionResult] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null); // New state for storing confirmation result

  const handleInputChange = (event, type) => {
    const value = event.target.value;
    switch (type) {
      case 'from':
        setFromAddress(value);
        break;
      case 'to':
        setToAddress(value);
        break;
      case 'amount':
        setAmount(value);
        break;
      default:
        break;
    }
  };

  const sendBitcoin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${Api}/api/wallet/send`, {
        fromAddress,
        toAddress,
        amount,
      });
      setTransactionResult(response.data);
    } catch (error) {
      console.error('Error sending Bitcoin:', error.response.data);
      setTransactionResult(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const getTransactionConfirmation = async () => {
    setIsLoading(true); 
    try {
    
      const transactionId = transactionResult.transactionId;
      const response = await axios.get(`${Api}/api/transaction/status/${transactionId}`);
      setConfirmationResult(response.data);
    } catch (error) {
      console.error('Error getting transaction confirmation:', error.response.data);
      setConfirmationResult(error.response.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }} style={{ marginTop: "20px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">
                Send Bitcoin
              </Typography>
              <TextField
                label="From Address"
                variant="outlined"
                fullWidth
                value={fromAddress}
                onChange={(event) => handleInputChange(event, 'from')}
                style={{ margin: "20px 0" }}
              />
              <TextField
                label="To Address"
                variant="outlined"
                fullWidth
                value={toAddress}
                onChange={(event) => handleInputChange(event, 'to')}
                style={{ margin: "20px 0" }}
              />
              <TextField
                label="Amount (in satoshis)"
                variant="outlined"
                fullWidth
                value={amount}
                onChange={(event) => handleInputChange(event, 'amount')}
                style={{ margin: "20px 0" }}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={sendBitcoin}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Bitcoin'}
              </Button>
              {transactionResult && (
                <div>
                  <Typography style={{ marginTop: "20px" }}>
                    {transactionResult.message || 'Transaction completed'}
                  </Typography>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={getTransactionConfirmation}
                    disabled={isLoading}
                    style={{ marginTop: "10px" }}
                  >
                    {isLoading ? 'Checking...' : 'Get Confirmation'}
                  </Button>
                </div>
              )}
              {confirmationResult && (
                <Typography style={{ marginTop: "20px" }}>
                  {confirmationResult.message || 'Confirmation status unavailable'}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SendBitcoinComponent;
