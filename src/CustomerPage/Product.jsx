import React from "react"
import {Link} from "react-router-dom"
import { Navigate,useNavigate } from "react-router-dom";


export default function Product(props){
    const {data} = props
    const navigate = useNavigate()
    function handleView(){
        navigate(`/product/details/${data.id}`)
    }
    return(
        <div className="product-card" onClick={handleView}>
            <img src={`${import.meta.env.VITE_API_URL_IMAGE}/${data.photoPath}`} />
            <div className="bottom-product-card">
                <p hidden >id:{data.id} </p>
                <h3> {data.name}</h3>
                <p>$ {data.price}</p>
            </div>
        </div>
    )
}