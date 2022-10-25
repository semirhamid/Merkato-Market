import React, {useState, useEffect} from "react";
import axios from "axios"
import Order from "./Order"
import Cookies from 'js-cookie'
import './App.css'

export default function Orders(){
    const [data, setData] = useState([])

    useEffect(()=>{
        const tokenStr = Cookies.get("token")
        axios.get(`${import.meta.env.VITE_API_URL}/api/order`,{ headers: {"Authorization" : `Bearer ${tokenStr}`} })
        .then(res => setData(res.data))
    },[])

    const MappedData = data.map(dat => <Order key={dat.id}
         data={dat}/>)


    return(
        <div>
            <table >
                <thead>

                <tr>
                <th>Id</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Tracking ID</th>
                <th>User ID</th>
                <th>Country</th>
                <th>Region</th>
                <th>City</th>
                <th>Zipcode</th>
                <th>Status</th>
                <th>Date</th>
                <th>Total Price</th>
                <th>Actions</th>
                
                

                </tr>

                </thead>

                <tbody>{MappedData}</tbody>
                
            </table>
            
        </div>
    )
}