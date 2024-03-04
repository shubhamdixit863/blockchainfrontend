import React ,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const Api="http://localhost:9090"
const CreateWallet = () => {
    const [state,setState]=useState({
        wallet_address:"",
        wallet_name:""
    })
    const [snackbar, setSnackBar] =useState({
        open:false,
        message:""
    });

    const handleClose = (event, reason) => {
        setSnackBar({
            open:false,
            message:""
        });
    };

    const [address,setAddress]=useState();
  

const handleChange=(event)=>{
    setState({...state,[event.target.name]:event.target.value});

}

const handleClick=()=>{
    let userId=localStorage.getItem("userId")
    axios.post(`${Api}/api/wallet/create`,{...state,userId}).then(result=>{
        console.log(result.data)
        setSnackBar({
            open:true,
            message:"Wallet Created"
        })
        setState({
            wallet_address:"",
            wallet_name:""
        })

        setAddress(undefined);

    }).catch(err=>{
      console.log(err);
        setSnackBar({
            open:true,
            message:err.response.data.error
        })
    })

}

const getAddress=()=>{

    axios.post(`${Api}/api/address/create`).then(result=>{
        console.log(result.data)
        setSnackBar({
            open:true,
            message:"Address Fetched"
        })
        setAddress({
            message:result.data.address
            ,
           
        })

    }).catch(err=>{
      console.log(err);
        setSnackBar({
            open:true,
            message:err.response.data.error
        })
    })

}

  return (

    <Box sx={{ flexGrow: 1 }} style={{marginTop:"200px"}}>

<Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={snackbar.message}
        anchorOrigin={{
            vertical: "top",
            horizontal: "center"
         }}
      
      />
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    <Grid item lg={6} md={4} sm={6}/>
        <Grid item xs={2} sm={4} md={4}  >
            <h1 style={{textAlign:"center"}}>Create Wallet</h1>
        <TextField id="outlined-basic" label="Wallet Address" variant="outlined" value={state.wallet_address} onChange={handleChange} name='wallet_address' fullWidth /> <br></br>
    <TextField id="outlined-basic" label="Wallet Name" variant="outlined" value={state.wallet_name} onChange={handleChange}  name='wallet_name' fullWidth style={{marginTop:"20px"}} />

    <Button variant="contained" onClick={handleClick} style={{marginTop:"20px"}} fullWidth>Create</Button>
    <Button variant="outlined" style={{marginTop:"20px"}} onClick={getAddress}>Get A Dummy Btc Address </Button>
        
        {
            address?<Card sx={{ minWidth: 275 }} style={{marginTop:"20px"}} >
            <CardContent >
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
               {address.message}
              </Typography>
            </CardContent>
            
          </Card>:""
        }
        
        
        
        </Grid>
        
      
    
    </Grid>
  </Box>
 
    
   

  
  )
}

export default CreateWallet