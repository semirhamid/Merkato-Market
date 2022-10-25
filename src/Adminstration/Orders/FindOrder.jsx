import React, { useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid';
import {useCookiesContext} from "../../utils/CookieManager"
import Loader from "../../Authethication/Loader";
import Alert from '@mui/material/Alert'

export default function FindOrder(props){
    const { cookies } = useCookiesContext();
    const [search, setSearch] = useState("")
    const [data, setData] = useState({roleName:[]})
    const [response , setResponse] = useState()
    const [isLoading , setIsLoading] = useState(false)


    const btnStyle = {borderRadius:"0.4em", padding:"0 0.3em",color:"white"}
    const deliveryBtn = {background:"rgb(229, 96, 142)",border:"none",color:"white",borderRadius:"0.3em",cursor:"pointer"}
 const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "product", headerName: "Product", width: 100 , renderCell: (params) => {
    return(
    <p>{params.row.product.name}</p>
  ) }},
  { field: "quantity", headerName: "Quantity" },
  { field: "userId", headerName: "User Id" },
  { field: "totalPrice", headerName: "TOtal Price" },
  { field: "address", headerName: "Address" },
  { field: "city", headerName: "City" },
  { field: "region", headerName: "Region" },
  { field: "country", headerName: "Country" },
  { field: "status", headerName: "Status",renderCell: (params) => {
    return(

    <p style={params.row.status === "Pending"?{background:"rgba(31, 128, 31, 0.766)", ...btnStyle}:{background:"rgb(229, 96, 142)",...btnStyle}}>{params.row.status}</p>
  ) } },
  { field: "date", headerName: "Date" },
  { field: "trackingId", headerName: "Tracking Id" },
  { field: "zipCode", headerName: "Zip Code" },
  { field: "action", headerName: "Action" ,renderCell: (params) => {
    return(

    (params.row.status === "Pending" )&& <button onClick={()=>handleDelivery(params.row.id)} style={{...deliveryBtn}}>Delivered</button>
  ) } },
];
    const handleDelivery = (id)=>{
      setIsLoading(true)
       axios.put(`${import.meta.env.VITE_API_URL}/api/order/deliverorder?id=${id}`,{
            headers: {"Authorization" : `Bearer ${cookies.token}`}
        })
        .then(response => {
            setIsLoading(false)
            setData(prev =>({...prev,status :"Delivered"}))
        }).catch(error=>{
                setIsLoading(false)
                console.log(error)
                
                
            })
    }

    function handleSubmit(evt){
        setIsLoading(true)
        setData({id:"", roleName:[]})
        evt.preventDefault()
        axios.get(`${import.meta.env.VITE_API_URL}/api/order/id?id=${search}`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        .then(res => {
            setData(res.data)
            setIsLoading(false)

        }).catch(error=>{
            setIsLoading(false)
            setResponse("Order with this id doesnot Exist")
            setTimeout(()=>setResponse(""), 3000)
            setSearch("")

        })
    }
    function handleChange(evt){
        setSearch(evt.target.value)
    }
    const rows = [{id:data.id,quantity:data.quantity, userId:data.userId,country:data.country, totalPrice:data.totalPrice, address:data.address, city:data.city,region:data.region,status:data.status,date:data.date,trackingId:data.trackingId,zipCode:data.zipCode, product:data.product? data.product.name :"" }
]
    return(
        < >
        {isLoading && <Loader />}
        <h4 id="changerolename">Order Finder</h4>
        <h1 id="roletitle">  Search an order by id</h1>
            <form onSubmit={handleSubmit}> 
            <label >
            <input id="rolename" placeholder="Order Id" type="number" value={search} onChange={handleChange} name="id"  />
            </label>
            <input id="submit" type="submit" value="Search"/>
            </form>
            <div className="searchresults">

        
        <DataGrid
        getRowId={(row) => row.id + row.product}
        count={1}
    
autoHeight
  rows={rows}
  columns={columns}
  
/>
{response &&  <Alert variant="outlined" severity="error">
        {response}
      </Alert>}
            </div>
            
            

        </>
    )
}