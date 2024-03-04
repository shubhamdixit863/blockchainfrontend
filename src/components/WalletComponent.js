import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Card, CardContent, CircularProgress, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
const Api="http://localhost:9090"
function WalletComponent() {
  const { walletName } = useParams(); 
  const [walletDetails, setWalletDetails] = useState(null);
  const [walletBalance,setWalletBalance]=useState(undefined);
  const [isLoading, setIsLoading] = useState(true);


  const getWalletBalance=async()=>{
    setIsLoading(true);
    try {
        const response = await axios.get(`${Api}/api/wallet/balance/${walletName}`);
        console.log(response.data.balance);
        setWalletBalance(response.data.balance);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error fetching wallet details:', error);
        
      } 

  }
  useEffect(() => {
    const fetchWalletDetails = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${Api}/api/wallet/details/${walletName}`);
        setWalletDetails(response.data);
      } catch (error) {
        console.error('Error fetching wallet details:', error);
        setWalletDetails(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWalletDetails();
  }, [walletName]); 
  return (
    <Box sx={{ flexGrow: 1 }} style={{marginTop:"200px"}}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    <Grid item lg={6} md={4} sm={6}/>
        <Grid item xs={2} sm={4} md={4}  >

        <div>
      {isLoading ? (
        <CircularProgress />
      ) : walletDetails ? (
        <Card>
          <CardContent>
            <Typography variant="h5" component="h2">
              Wallet Name: {walletDetails.name}
            </Typography>
            <Typography color="textSecondary" style={{padding:"30px"}}>
              Balance:   {   
            
            walletBalance>=0?

            <Typography color="textSecondary" >{walletBalance}</Typography>
            :<Button  variant="contained" onClick={getWalletBalance} >Get Wallet Balance</Button>
        }
            </Typography>
            
          
          </CardContent>
        </Card>
      ) : (
        <Typography>No wallet details available</Typography>
      )}
    </div>

        </Grid>
        </Grid>
        
  </Box>
   
  );
}

export default WalletComponent;
