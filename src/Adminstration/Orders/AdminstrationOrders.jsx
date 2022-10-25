import axios from "axios";
import React, { useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import withPaginationHOC from "../../utils/withPaginationHOC"
import "./adminstrationorders.scss";
import SearchBar from "material-ui-search-bar";
import {useCookiesContext} from "../../utils/CookieManager"
import FindOrder from "./FindOrder";


const AdminstrationOrders = (props)=> {

const { cookies } = useCookiesContext();
const [search, setSearch] = useState("")
const {data, response, setData, setIsLoading,setTotalNumberOfRecords,recordsPerPage, 
    totalnumberofrecords,isLoading, setRecordsPerPage, page,setPage, setResponse, errors, setErrors} = props

    const btnStyle = {borderRadius:"0.4em", padding:"0 0.3em",color:"white"}
    const deliveryBtn = {background:"rgb(229, 96, 142)",border:"none",color:"white",borderRadius:"0.3em",cursor:"pointer"}

    const orderColumns = [
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
  ) } }
];
    const handleDelivery = (id)=>{
      setIsLoading(true)
       axios.get(`${import.meta.env.VITE_API_URL}/api/order/deliverorder?id=${id}`,{
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


    return(
        
<div className="adminstrationorders">
<h1 id="ordermanage">Order Management</h1>
<div className="findorder">
  <FindOrder />
</div>
<div className="datatable">
    <div className="datatableTitle">
       
    </div>
    <div className="ordertable">
      <h4 id="ordermgmt">Orders Management</h4> 
      <DataGrid
  rows={data}
  rowCount={parseInt(totalnumberofrecords)}
  loading={isLoading}
  rowsPerPageOptions={[5, 10,15,20,50]}
  pagination
  autoHeight
  page={page}
  pageSize={recordsPerPage}
  paginationMode="server"
  onPageChange={(newPage) => setPage(newPage)}
  onPageSizeChange={(newPageSize) => setRecordsPerPage(newPageSize)}
  columns={orderColumns}
/>
    </div>


    </div>

        </div>

        

    )
}

export default withPaginationHOC(AdminstrationOrders, {method:"get" ,url :`${import.meta.env.VITE_API_URL}/api/order/getorders`}) 


