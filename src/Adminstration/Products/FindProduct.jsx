import React, { useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import {useCookiesContext} from "../../utils/CookieManager"
import Loader from "../../Authethication/Loader";
import { Link } from "react-router-dom";
import Alert from '@mui/material/Alert'

export default function FindProduct(props){
    const { cookies } = useCookiesContext();
    const [search, setSearch] = useState("")
    const [data, setData] = useState({id:""})
    const [response , setResponse] = useState()
    const [isLoading , setIsLoading] = useState(false)

    const btnStyle = {background:"rgb(212, 16, 16)",border:"none",color:"white",borderRadius:"0.3em",cursor:"pointer"}

    const handleDelete =(id)=>{
            setIsLoading(true)
       axios.delete(`${import.meta.env.VITE_API_URL}/api/product?id=${id}`,{
            headers: {"Authorization" : `Bearer ${cookies.token}`}
        })
        .then(response => {
            setIsLoading(false)
            setResponse(response)
        }).catch(error=>{
                setIsLoading(false)
                
                console.log(error)
            })
    }
    
    const ProductColumns= [
  { field: 'id', headerName: 'Id' , width: '80' },
  { field: 'name', headerName: 'Product name', width: 150,renderCell: (params) => {
    return( <Link to={`/adminstration/productdetails/${params.row.id}`}><p>{params.row.name  }</p></Link>
  ) } },
  { field: 'description', headerName: 'Description', width: 300 },
  ,
  { field: "Seller", headerName: "Seller" ,renderCell: (params) => {
    return( data.id && <Link to={`/adminstration/userdetails/${params.row.sellerId}`}><p>{params.row.sellerFirstName + "  " +params.row.sellerLastName  }</p></Link>
  ) } },
  { field: 'quantity', headerName: 'Quantity'},
  { field: 'price', headerName: 'Price' },
  { field: 'size', headerName: 'Size' },
  { field: 'weight', headerName: 'Weight' },
  { field: 'color', headerName: 'Color' },
  { field: 'category', headerName: 'Category' },
  { field: 'date', headerName: 'Date' },
  { field: 'sellerEmail', headerName: 'Seller Email' },
  { field: 'sellerId', headerName: 'Seller Id' },
  { field: "actions", headerName: "Action" ,renderCell: (params) => {
    return( data.id && <button style={btnStyle} onClick={()=>handleDelete(params.row.id)}>Delete</button>
  ) } }]


    function handleSubmit(evt){
        setIsLoading(true)
        setData({id:"", roleName:[]})
        evt.preventDefault()
        axios.get(`${import.meta.env.VITE_API_URL}/api/product/${search}`)
        .then(res => {
            setData(res.data)
            setIsLoading(false)

        }).catch(error=>{
            setIsLoading(false)
            setResponse("Product with this id doesnot Exist")
            setTimeout(()=>setResponse(""), 3000)
            setSearch("")
            

        })
    }

    function handleChange(evt){
        setSearch(evt.target.value)
    }

const rows = [data]
    return(
        < >
        {isLoading && <Loader />}
        <h4 id="changerolename">Product Finder</h4>
        <h1 id="roletitle">  Search a Product by id</h1>
            <form onSubmit={handleSubmit}> 
            <label >
            <input id="rolename" placeholder="Product Id" type="number" value={search} onChange={handleChange} name="id"  />
            </label>
            <input id="submit" type="submit" value="Search"/>
            </form>
            <div className="searchresults">

        
        <DataGrid
        getRowId={(row) => row.id + row.name}
        count={1}
    
autoHeight
  rows={rows}
  columns={ProductColumns}
  
/>
{response &&  <Alert variant="outlined" severity="error">
        {response}
      </Alert>}
            </div>
            
            

        </>
    )
}