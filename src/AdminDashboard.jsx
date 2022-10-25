import "./admindashboard.scss"
import React,{useEffect, useState} from 'react'
import Widget from "./Component/widget/Widget"
import Featured from "./Component/featured/Featured"
import Chart from './Component/chart/Chart'
import Table from "./Component/table/Table"
import {useCookiesContext} from "./utils/CookieManager"
import axios from "axios"
import { DataGrid} from '@mui/x-data-grid';
import { Link } from 'react-router-dom'


export default function AdminDashboard() {
  const {cookies} = useCookiesContext()
  const [data, setDatas] = useState({totalProduct:0,totalOrder:0,totalUsers:0,lastTenProducts:[],lastSeveDaysOrders:[]})
   useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/Account/getadminstratordashboard`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}}).then((res) => {
                setDatas(res.data)
    }).catch((err) => {console.log(err);});
    },[])

    const sevenDays = data.lastSeveDaysOrders;
  const chartdata = sevenDays.map(order => ({name:order.date.slice(0,10),Total:order.totalPrice}))


const ProductColumns= [
  { field: 'id', headerName: 'Id' , width: '80' },
  { field: 'productName', headerName: 'Product name', width: 150},
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'quantity', headerName: 'Quantity'},
  { field: 'price', headerName: 'Price' },
  { field: 'size', headerName: 'Size' },
  { field: 'weight', headerName: 'Weight' },
  { field: 'color', headerName: 'Color' },
  { field: 'category', headerName: 'Category' }
];
const productsRows = data.lastTenProducts.map(product =>  ({id:product.id,productName:product.name,quantity:product.quantity, price:product.price,
description: product.description, size:product.size, weight:product.weight,color:product.color,category:product.category}))

  return (
    <div className='homeContainer'>
        <div className="widgets">
          <Widget type="user" id={"/adminstration/users"}  count={data.totalUsers}/>
          <Widget type="orders" id={"/adminstration/orders"} count={data.totalOrder}/>
          <Widget type="earning" count={data.totalsales * 0.2 ||0} />
          <Widget type="balance" count={data.totalsales } />
        </div>
        <div className="charts">
          <Featured count={data.todaysSales} />
          <Chart title="Last 7 Days (Revenue)" data={chartdata} aspect={2 / 1} />
        </div>
        <div className="listContainer">
          <div className="listTitle">Recently added Products</div>
          <DataGrid autoHeight  rows={productsRows} columns={ProductColumns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection/>
        </div>
    </div>
  )
}
