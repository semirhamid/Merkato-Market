import React, {useState, useEffect} from "react"
import axios from "axios"
import { Navigate } from "react-router"
import {useCookiesContext} from "../utils/CookieManager"
import "./login.scss"
import { Link } from "react-router-dom"
import Merkato from "./merkatologodark.png"
import { useNavigate } from "react-router"
import Loader from "./Loader"
import jwt_decode from "jwt-decode"


export default function Login(props){
    const navigate = useNavigate()
    const { setCookie } = useCookiesContext();
    const [response, setResponse] = useState();
    const [isLoading, setIsLoading]  = useState(false)
    const [formData, setFormData] = useState({email: "",password: ""})


    useEffect(() => {
          google.accounts.id.initialize({
            client_id: "325705872998-8q90hakb9mgjo7rmlnr8rmc6rue6hhli.apps.googleusercontent.com",
            callback: handleCredentialResponse
          });
          google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }  // customization attributes
          );
          google.accounts.id.prompt(); // also display the One Tap dialog
        }, [])
        
  function handleCredentialResponse(response) {
          const url =` ${import.meta.env.VITE_API_URL}/api/auth/externallogin`
          var decoded = jwt_decode(response.credential) 
          const externalLoginModel = {
            loginProvider : "Google",
            email : decoded.email,
            firstName : decoded.given_name,
            lastName : decoded.family_name,
            providerDisplayName : "Google",
            providerKey: decoded.sub
          }
          setIsLoading(true)
          axios.post(url, externalLoginModel ).then((res) => {
  if(res.data.isSuccess){
    setCookie("role" ,JSON.stringify(res.data.role))
    setCookie("token" ,  res.data.message)
    setCookie("firstName", res.data.firstName)
    setCookie("expireDate" , res.data.expireDate)
    setCookie("userId" , res.data.userId)
        }
        setResponse(res.message)
        navigate("/")
        setIsLoading(false)
      })
      .catch((err) => {
        setResponse(err.response.data[0])
        setIsLoading(false)
      });
        }
    function handleChange(event){
    const {name, value, type, checked} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))
    
}

function handleSubmitData(evt){
  evt.preventDefault()
    const form = new FormData();
    const url = `${import.meta.env.VITE_API_URL}/api/auth/login`
    form.append("email", formData.email)
    form.append("password", formData.password)
setIsLoading(true)
axios.post(url, form).then((res) => {
  if(res.data.isSuccess){
    setCookie("role" ,JSON.stringify(res.data.role))
    setCookie("token" ,  res.data.message)
    setCookie("firstName", res.data.firstName)
    setCookie("expireDate" , res.data.expireDate)
    setCookie("userId" , res.data.userId)
        }
        setResponse(res.message)
        navigate("/")
        setIsLoading(false)
      })
      .catch((err) => {
        setResponse(err.response.data[0])
        setIsLoading(false)
      });
}

return(
    <div className="loginPage">
      {isLoading && <Loader />}
      <img src={Merkato} alt="" />
      <div className="title">
        <h2>Merkato Market</h2>
        <p>Hey, Enter your details to get sign in to your account</p>
      </div>
      
        <form onSubmit={handleSubmitData}>
          <input className="auth" type="email" onChange={handleChange} value={formData.email} 
          placeholder="Enter Email Address" name="email"  />
            <input id="password" className="auth" type="password"  placeholder="Password" name="password" value={formData.password} onChange={handleChange} />
            <Link id="forget" to="/account/forgetpassword">Forget password</Link>
            {response && <h5 style={{color:"red"}}>{response}</h5>}
            <input id="signin" type="submit"  value="Sign In" />
        </form>

        <div id="buttonDiv"></div> 
        

        <span className="donthaveaccount">Don't have an account? <Link to="/account/register">Create new Account</Link></span>
    </div>
)
}