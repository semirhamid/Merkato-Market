import axios from "axios";
import React, { useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { Link } from "react-router-dom";
import withPaginationHOC from "../../utils/withPaginationHOC"
import "../Orders/adminstrationorders.scss";
import SearchBar from "material-ui-search-bar";
import {useCookiesContext} from "../../utils/CookieManager"
import FindProduct from "./FindProduct";


const AdminstrationProducts = (props)=> {

const { cookies } = useCookiesContext();

const {data, setIsLoading,recordsPerPage, 
    totalnumberofrecords,isLoading, setRecordsPerPage, page,setPage, setResponse} = props

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
    return( <Link to={`/adminstration/userdetails/${params.row.sellerId}`}><p>{params.row.sellerFirstName + "  " +params.row.sellerLastName  }</p></Link>
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
  { field: "actions", headerName: "Delete" ,renderCell: (params) => {
    return( <button style={btnStyle} onClick={()=>handleDelete(params.id)}>Delete</button>
  ) } },{ field: "edit", headerName: "Edit" ,renderCell: (params) => {
    return( <Link id="editor" to={`/adminstration/editproduct/${params.row.id}`}>Edit</Link>
  ) } }
];



    return(
        
<div className="adminstrationorders">
<h1 id="ordermanage">Products Management</h1>
<div className="findorder">
  <FindProduct />
</div>
<div className="datatable">
    <div className="datatableTitle">
       
    </div>
    <div className="ordertable">
      <h4 id="ordermgmt">Products Management</h4> 
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
  columns={ProductColumns}
/>
    </div>


    </div>

        </div>

        

    )
}

export default withPaginationHOC(AdminstrationProducts, {method:"get" ,url :`${import.meta.env.VITE_API_URL}/api/product/getbypage`}) 


