import "./single.scss";
import Sidebar from "../Component/sidebar/Sidebar";
import Navbar from "../Component/navbar/Navbar";
import Chart from "../Component/chart/Chart";
import { DataGrid } from '@mui/x-data-grid';
import React, { useState ,useEffect} from "react";
import { useParams } from "react-router-dom";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useCookiesContext} from "../utils/CookieManager"
import axios from "axios";
import {Link} from "react-router-dom"
import Widget from "../Component/widget/Widget"


const SingleUser = (props) => {
  const [data, setData] = useState({totalOrder: 0,totalProduct:0,orders:[],products:[], user: {}})
  const [errors, setErrors] = useState()
  const { cookies } = useCookiesContext();
  const {id} = useParams()
 
  useEffect(() => {
  const url = `${import.meta.env.VITE_API_URL}/api/Account/getuserdetail?id=`+ id.trim()
        axios.get(url, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})  
        .then(response=>{
            setData(response.data)

        } ).catch(error=>
            {setErrors("user with this email does not exist")})
}, [])

   function deleteUser(){
        const url = `${import.meta.env.VITE_API_URL}/api/account/${id}`
        axios.delete(url, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})  
        .then(response=>{
        } ).catch(error=>
            {console.log(error.message)} )}

            

          
const columns= [
  { field: 'id', headerName: 'Order Id' , width: '80' },
  { field: 'productName', headerName: 'Product name', width: 150,renderCell: (params) => {
    return(
    <Link to={`/product/details/${params.id}`}>{params.value}</Link>
  ) }},
  { field: 'quantity', headerName: 'Quantity'},
  { field: 'price', headerName: 'Price' },
  { field: 'trackingId', headerName: 'Tracking Id' },
  { field: 'status', headerName: 'Status' },
  { field: 'country', headerName: 'Country' },
  { field: 'region', headerName: 'Region' },
  { field: 'city', headerName: 'City' },
  { field: 'date', headerName: 'Date' }
];

const ProductColumns= [
  { field: 'id', headerName: 'Id' , width: '80' },
  { field: 'productName', headerName: 'Product name', width: 150},
  { field: 'description', headerName: 'Description', width: 100 },
  { field: 'quantity', headerName: 'Quantity'},
  { field: 'price', headerName: 'Price' },
  { field: 'size', headerName: 'Size' },
  { field: 'weight', headerName: 'Weight' },
  { field: 'color', headerName: 'Color' },
  { field: 'category', headerName: 'Category' }
];

const rows = data && data.orders.map(item =>  ({id:item.id,productName:item.product.name,quantity:item.quantity, price:item.totalPrice,
trackingId:item.trackingId, status:item.status,region:item.region,country:item.country,city:item.city,date:item.date.slice(0,10)})) 


const productsRows = data && data.products.map(product => ({id:product.id,productName:product.name,quantity:product.quantity, price:product.price,
description: product.description, size:product.size, weight:product.weight,color:product.color,category:product.category}))
const orderspagesize = data && data.totalOrder % 10
const productspagesize = data && data.totalProduct % 10

  return (
    <div className="single">

      <div className="singleContainer">


        {!errors && <main>
      <div className="top">
          <div className="left">
            
<div className="left">
  <button onClick={deleteUser} className="deleteButton">Delete</button>
            <h1 className="title">Information</h1>
  {data && 
                <div className="item">
              <div className="details">
                <h1 className="itemTitle">{data.user.firstName + "  " + data.user.lastName}</h1>

                <div className="detailItem">
                  <span className="itemKey">Id:</span>
                  <span className="itemValue">{data.user.userId}</span>
                </div>
                

                <div className="detailItem">
                  <span className="itemKey">Gender:</span>
                  <span className="itemValue">{data.user.gender}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Birthdate:</span>
                  <span className="itemValue">{data.user.birthday && data.user.birthday.slice(0,10)}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.user.phoneNumber}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {data.user.address}
                  </span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">{data.user.country}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">Region:</span>
                  <span className="itemValue">{data.user.region}</span>
                </div>

                <div className="detailItem">
                  <span className="itemKey">City:</span>
                  <span className="itemValue">{data.user.city}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Role:</span>
                  <span className="itemValue">{data.user.role.toString() || "Customer"}</span>
                </div>

              </div>
            </div>}
</div>

<div className="right">
  <div className="component">
    <h4 id="title">
      Total Orders
    </h4>
    <h4 id="count">{data.totalOrder}</h4>
  </div>
 
  <div className="component">
    <h4 id="title">
      Total Products
    </h4>
    <h4 id="count">{data.totalProduct}</h4>
  </div>
</div>
</div>
          <div className="right">
            
          </div>
        </div>
        <div className="bottom">

                <div className="orders">
                    <h4>Previous Transaction History</h4>
                    <DataGrid id="orders" rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
                </div>
                <div className="products">
                    <h4>Your Products</h4>
                    <DataGrid id="products" rows={productsRows} columns={ProductColumns}  pageSize={10} rowsPerPageOptions={[10]} />
                </div>
        </div>
        </main>}
      </div>
    </div>
  );
};

export default SingleUser;


