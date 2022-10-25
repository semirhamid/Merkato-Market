import React, {useState, useEffect} from 'react'
import axios from "axios"
import { Link } from 'react-router-dom';
import './relatedproducts.scss'
import Rating from '@mui/material/Rating';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { useOutletContext } from "react-router-dom";
import { useNavigate} from 'react-router-dom';
import {formatCurrency} from "../../utils/formatCurrency"
import { nanoid } from 'nanoid';

export default function Related(props) {
    const {keyword, category}= props
    const navigate = useNavigate();
    const [data, setData] = useState([])

function handleDetail(id){
        navigate(`/product/details/${id}`);
    }

    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/Product/related?keyword=${keyword}&category=${category}`)
        .then(res => {setData(res.data);}).catch(error => console.log(error))
    },[keyword,category])



    const product = data && data.map(product =>{
        const titleLength = (product.name).length
        const title = titleLength> 62 ? (product.name).slice(0,62) : product.name

        return(<div key={nanoid()} className="product">
            <div className="imageContainer" onClick={()=>handleDetail(product.id)}>
                <img src={`${import.meta.env.VITE_API_URL_IMAGE}/${product.photoPath}`} alt="" />
                <div className="quickview">
                    <p onClick={()=>handleDetail(product.id)}> VIEW</p>
                </div>
                
            </div>
            <div className="content">
                <h4> {title}</h4>
 <Rating
        value={Math.ceil(Math.random() * 5)}
        onChange={(event, newValue) => {
        setValue(newValue);
        }}
        style={{width:"20%"}}
        size="small"
        precision={0.1}
      />   <span><del>{formatCurrency(product.price * 1.15)}</del>{formatCurrency(product.price)}<LocalMallIcon className='material' /></span>
            </div>
        </div>)}
)

  return (
    <div className='superMainContent'>
    <div className="maincontent">
    <div className='contents'>       
        {product}
    </div>
</div>
</div>
  )
}
