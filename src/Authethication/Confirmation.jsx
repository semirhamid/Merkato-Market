import React from 'react'
import { useNavigate, useParams } from "react-router-dom";
import "./confirmation.scss"
import Merkato from "./merkatologodark.png"


export default function Confirmation() {
    const {email} = useParams()
     const navigate = useNavigate()
  return (
    <div className='confirmation'>
        <img src={Merkato} alt="" />
        <h1>Merkato Market</h1>
        <div className="title">
            <h2>Confirm your Email</h2>
        </div>
        
        <div className="instruction">
            <p>A confirmation email has been sent to <strong>{`${email}.com`}</strong>  . Please check your inbox. Follow the instruction on the email to confirm your email address.</p>
        <p>After you confirm click Continue</p>
        <p>Please check in spam </p>
        </div>
        
        <div className="button">
            <button onClick={()=>{navigate("/account/login")}}>Continue</button>
        </div>
        
    </div>
  )
}
