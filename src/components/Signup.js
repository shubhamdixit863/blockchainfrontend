import React ,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import Snackbar from '@mui/material/Snackbar';


const Api="http://localhost:9090"
const Signup = () => {
    const [state,setState]=useState({
        name:"",
        userId:""
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
  

const handleChange=(event)=>{
    setState({...state,[event.target.name]:event.target.value});

}

const handleClick=()=>{
    axios.post(`${Api}/api/users/register`,state).then(result=>{
        console.log(result.data)
        setSnackBar({
            open:true,
            message:"User Created"
        })
        setState({
            name:"",
            userId:""
        })

    }).catch(err=>{
      console.log(err);
        setSnackBar({
            open:true,
            message:"Error Creating User"
        })
    })

}

  return (

    <Box sx={{ flexGrow: 1 }} style={{marginTop:"200px"}}>

<Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbar.message}
      
      />
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    <Grid item lg={6} md={4} sm={6}/>
        <Grid item xs={2} sm={4} md={4}  >
            <h1 style={{textAlign:"center"}}>Signup</h1>
        <TextField id="outlined-basic" label="Name" variant="outlined" value={state.name} onChange={handleChange} name='name' fullWidth /> <br></br>
    <TextField id="outlined-basic" label="UserId" variant="outlined" value={state.userId} onChange={handleChange}  name='userId' fullWidth style={{marginTop:"20px"}} />

    <Button variant="contained" onClick={handleClick} style={{marginTop:"20px"}} fullWidth>Signup</Button>
        </Grid>
        
    
    </Grid>
  </Box>
 
    
   

  
  )
}

export default Signup