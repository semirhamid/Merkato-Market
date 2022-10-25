import React from 'react'
import { useNavigate } from "react-router-dom";
import "./confirmation.scss"
import Merkato from "./merkatologodark.png"


export default function ConfirmEmail() {
    const navigate = useNavigate()

    return (
    <div className='confirmation'>
        <img src={Merkato} alt="" />
        <h1>Merkato Market</h1>
        <div className="title">
            <h2>Your account has been confirmed successfully</h2>
        </div>
        
        <div className="instruction">
            <p>We would like to thank you for choosing us.</p>
            <p>Welcome to the largest market place in the whole <strong>Africa</strong></p>
        <p>Click below to Login</p>
        </div>
        
        <div className="button">
            <button onClick={()=>{navigate("/account/login")}}>Login</button>
        </div>
        
    </div>
  )
}
