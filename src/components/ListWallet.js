import React,{useEffect, useState} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Api="http://localhost:9090"
const columns = [
  { field: '_id', headerName: 'Id', width: 70 },
    { field: 'token', headerName: 'TOKEN', width: 70 },
    { field: 'name', headerName: 'Wallet Name', width: 130 ,

    renderCell: (params) => {
      return (
        <Link to={`/wallet/${params.value}`} target="_blank" rel="noopener noreferrer">
          {params.value}
        </Link>
      );
    }
  
  
  },
    { field: 'addresses', headerName: 'Addresses',width:1230,
    valueGetter: (params) =>{
     return `${params.row.addresses.join(",")}`;
    }
    
},
 
    
   
     
  ];

  

const ListWallet = () => {

  const [rows,setRows]=useState([]);

  useEffect(()=>{
    const userId=localStorage.getItem("userId");
    axios.get(`${Api}/api/wallet/list/${userId}`).then(result=>{
      debugger;
      setRows(result.data.data);
     

    }).catch(err=>{
      console.log(err);
        
    })



  },[])
  return (
    <Box sx={{ flexGrow: 1 }} style={{marginTop:"100px"}}>
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
    <Grid item lg={6} md={2} sm={6}/>
  
        <Grid item xs={2} sm={4} md={8}  >
        <h1 style={{textAlign:"center"}}>List Wallet</h1>
        <DataGrid
        rows={rows}
        getRowId={(row) => row._id} 
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
   

        </Grid>
        
    
    </Grid>
    </Box>
  )
}

export default ListWallet