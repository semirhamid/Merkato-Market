import React, { useState,useEffect } from 'react'
import "./productdetail.scss"
import axios from "axios"
import GroupedButtons from "./GroupedButtons";
import { useParams , useNavigate} from 'react-router-dom'
import RelatedProducts from './RelatedProducts';
import QuantityButtons from '../Cart/QuantityButtons';
import {  useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice';
import Reviews from '../CustomerFooter/Reviews';
import Rating from '@mui/material/Rating';
import { nanoid } from 'nanoid';

export default function ProductDetail() {
    
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [data, setData] = useState({description:""})
    const {id} = useParams()

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/product/${id}`)
        .then(res => {setData(res.data)
            
        })
    },[id])

    const handleAddToCart=(item)=>{
        dispatch(addToCart(item))
    }
    function handleBuy(){
        dispatch(addToCart(item))
        navigate("/cart")
    }
    const item = {id:data.id, name:data.name, quantity: 1,img: `${import.meta.env.VITE_API_URL_IMAGE}/${data.photoPath}`, price:data.price, stock:data.quantity }
    const title= [<h2 key="upper" className='title'>{data.name}</h2>]
    const cartContainer = [<div className="cartContainer" key={"container"}>
            <div className="cart">
            <h2>£ {data.price}</h2>
            
            <p className='date'>£{data.price} delivery in 2 - 3 days</p>
            
            <h2 className='date'>{data.quantity > 0? "In stock": "Out of Stock"}</h2>
            
            Quantity:  <QuantityButtons   productId={{id:data.id}} stock={data.quantity}/>
            
            <br />
            <button id='addCart' onClick={()=>handleAddToCart(item)}>Add to Cart</button>
            <button onClick={handleBuy} id='buyNow'>Buy now</button>
            <p>Secured Transaction</p>
            
            <table>
                <tbody>
                    <tr>
                        <td>Dispatches from</td>
                        <td>Merkato</td>
                    </tr>
                    <tr>
                        <td>Sold by</td>
                        <td>Merkato</td>
                    </tr>
                </tbody>
            </table>
            <p><strong>Return Policy: </strong> Not returnable</p>
        </div>
        </div>
]
let descArray = data.description.split(".")
const lists = descArray.map(sentence=><li key={nanoid()}>{sentence}</li>)

return (
    <div className="super">
    <div className='productdetail'>
        { window.innerWidth <= 1000 && title }
        <div className="image">
            
            <img src={data.photoPath? `${import.meta.env.VITE_API_URL_IMAGE}/${data.photoPath}` : ""} alt="" />
        </div>
        { window.innerWidth <= 1000 && cartContainer }
        <div className="content">
            
            { window.innerWidth > 1000 && title }
            
            <div className="table contenttable">
                <h2><button disabled>ETB</button><span>   32 <sup>99</sup></span></h2>
            <table>
                <tbody>
                    <tr>
                        <th>Color</th>
                        <td>{data.color}</td>
                    </tr>
                    <tr>
                        <th>Weight</th>
                        <td>{data.weight} Kg</td>
                    </tr>
                    <tr>
                        <th>Category</th>
                        <td>{data.category}</td>
                    </tr>
                    <tr>
                        <th>Size</th>
                        <td>{data.size}</td>
                    </tr>
                    <tr>
                        <th>Rating</th>
                        <td><Rating value = {data.rating || 1} disabled  onChange={()=>{}}/></td>
                    </tr>
                    
                </tbody>
            </table>
            </div>
            
            <h3>About this item</h3>

            <ul>
                
               { lists}
                
            </ul>

        </div>
        { window.innerWidth > 1000 && cartContainer }
    </div>
    
    <div className="related">
        <h4 id='relatedtitle'>Related Products</h4>
        <RelatedProducts keyword={data.name && data.name.split(" ")[0]}  category={data.category}/>
    </div>
    <div className="productreview">
        <p>comments ({data.count == 1 | data.count == 0 ? data.count && (data.count).toString() + "  Review" : data.count &&  (data.count).toString() + "  Reviews"})</p>
        <hr />
        <Reviews productId = {id} />
    </div>
    
    </div>
)
}
