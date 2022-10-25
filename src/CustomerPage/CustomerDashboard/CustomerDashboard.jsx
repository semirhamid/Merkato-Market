import React, {useState, useEffect} from 'react'
import "./customerdashboard.scss"
import axios from 'axios'
import { useCookiesContext } from '../../utils/CookieManager'
import Widget from '../../Component/widget/Widget'
import { DataGrid} from '@mui/x-data-grid';
import { Link } from 'react-router-dom'

export default function CustomerDashboard() {
    const { cookies } = useCookiesContext();
    const [data, setData] = useState({totalOrder: 0,totalProduct:0,orders:[],products:[]})


    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/Account/getuserdashboard`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}}).then((res) => {
                setData(res.data)
    }).catch((err) => {console.log(err);});
    },[])

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
  { field: 'description', headerName: 'Description', width: 300 },
  { field: 'quantity', headerName: 'Quantity'},
  { field: 'price', headerName: 'Price' },
  { field: 'size', headerName: 'Size' },
  { field: 'weight', headerName: 'Weight' },
  { field: 'color', headerName: 'Color' },
  { field: 'category', headerName: 'Category' },
  ,{ field: "edit", headerName: "Edit" ,renderCell: (params) => {
    return( <Link id="editor" className='edit btn-edit' to={`/account/editproduct/${params.row.id}`}>Edit</Link>
  ) } }
];


const rows = data.orders.map(item => ({id:item.id,productName:item.product.name,quantity:item.quantity, price:item.totalPrice,
trackingId:item.trackingId, status:item.status,region:item.region,country:item.country,city:item.city,date:item.date.slice(0,10)}))


const productsRows = data.products.map(product => ({id:product.id,productName:product.name,quantity:product.quantity, price:product.price,
description: product.description, size:product.size, weight:product.weight,color:product.color,category:product.category}))

const orderspagesize = data.totalOrder % 10
const productspagesize = data.totalProduct % 10

    return (
        <>
            <div className='customerdashboard'>
                <div className="wids">
                    <Widget type={"orders"} id={"#orders"} count={data.totalOrder || 0} />
                    <Widget type={"products"} id={"#products"} count={data.totalProduct || 0} />
                </div>
                <div id="orders" className="orders">
                    <h4>Previous Transaction History</h4>
                    <DataGrid id="orders" rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection/>
                </div>
                <div className="products">
                    <h4 id="products">Your Products</h4>
                    <DataGrid id="products" rows={productsRows} columns={ProductColumns} pageSize={10} rowsPerPageOptions={[10]} checkboxSelection/>
                </div>

                
            </div>
        </>
    
    )
}
