import React, {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";
import Merkato from "./merkatologodark.png"
import "./forgetpassword.scss"


export default function ForgetPassword(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")

    function handleSubmit(evt){
        evt.preventDefault()
        const url = `${import.meta.env.VITE_API_URL}/api/auth/forgetpassword?email=${email}`
        axios.post(url).then((res) => {

        if(res.data.isSuccess===true){
            navigate(`/account/confirmation/${email}`)
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }

    function handleChange(evt){
        evt.preventDefault()
        setEmail(evt.target.value)
        
    }
    console.log(email)
    return(
        <div className="forgetPassword">
            <img src={Merkato} alt="" />
            <h1>Merkato Market</h1>
            <h2>Forget Password</h2>

        <form onSubmit={handleSubmit} >
            <label htmlFor="email">Email</label>
            <input  type="email" id="email" value={email} onChange={handleChange} name="email" placeholder="abc@example.com" />
            <input id="submit" type="submit" value="Reset" /> 
        </form>

        </div>
    )
}