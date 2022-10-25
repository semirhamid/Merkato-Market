import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios"
import { Navigate,useNavigate } from "react-router-dom";
import { useCookiesContext } from "./utils/CookieManager";

export default function DetailsProduct(props){
    const { cookies } = useCookiesContext();
    const navigate = useNavigate()
    const {productId} = useParams()
    const [productData, setProductData] = useState([])
    useEffect(()=>{
        axios.get(`${import.meta.env.VITE_API_URL}/api/product/${productId}`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        .then(res => {setProductData(res.data)})
    },[])

    async function handleDelete(productId){

        try{
        axios.delete(`${import.meta.env.VITE_API_URL}/api/product/${productId}`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        }catch(error){
            console.log("error" , error)
        }finally{
            navigate("/")
        }
    }

    function handleEdit(){

    }


    return(  
        <div>
            <img src={`${import.meta.env.VITE_API_URL_IMAGE}/${productData.photoPath}`} />
            <div className="bottom-product-card">
                <p hidden >id:{productData.id} </p>
                <h3> {productData.name}</h3>
                <p hidden >id:{productData.id} </p>
                <p>$ {productData.price}</p>
                <p>{productData.description}</p>
                <p>Weight: {productData.weight}</p>
                <p>Quantity: {productData.quantity}</p>
                <p>Categories: {productData.categories}</p>
                <button onClick={()=>{handleEdit(productData.id)}}>Edit</button>
                    <button onClick={()=>{handleDelete(productData.id)}}>Delete</button>
            </div>
        </div>
    )
}