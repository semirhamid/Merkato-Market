import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import "./orderconfirmation.scss"
import Merkato from "./merkatologodark.png"


export default function OrderConfirmation() {
    const {tracking} = useParams()
    const navigate = useNavigate()

    return (
    <div className='confirmation'>
        <img src={Merkato} alt="" />
        <h1>Merkato Market</h1>
        <div className="title">
            <h2>Thank you for choosing us</h2>
        </div>
        
        <div className="instruction">
            <p>Here is your tracking id: <strong>{tracking}</strong>. You can follow where your item currently is.</p>
        
        </div>
        
        <div className="button">
            <button onClick={()=>{navigate("/")}}>Continue Shopping</button>
        </div>
        
    </div>
  )
}
