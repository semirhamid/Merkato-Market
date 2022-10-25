import React from "react"
import axios from "axios"
import { useCookiesContext } from "../utils/CookieManager"

export default function Order(props){
    const {cookies} = useCookiesContext()
    const {data} = props

    
    function handleEdit(){
        
    }
    function handleDelete(){
        try{
        axios.delete(`${import.meta.env.VITE_API_URL}/api/order/${data.id}`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        }catch(error){
            console.log("error" , error)
        }
    }

    return(
            <tr>
            <td>{data.id}</td>
            <td>{data.product.name}</td>
            <td>{data.quantity}</td>
            <td>{data.trackingId}</td>
            <td>{data.userId}</td>
            <td>{data.country}</td>
            <td>{data.region}</td>
            <td>{data.city}</td>
            <td>{data.zipCode}</td>
            <td>{data.status}</td>
            <td>{data.date.slice(0,10)}</td>
            <td>$ {data.totalPrice}</td>
            <td><button onClick={handleEdit}>Edit</button>
                <button onClick={handleDelete}>Delete</button></td>
            </tr>
    )
}
