import React, { useState, useEffect, useRef } from 'react'
import {  Link } from 'react-router-dom'
import "./customerheader.scss"
import Merkato from "./merkatologo.png"
import axios from 'axios';
import {useNavigate, useLocation} from "react-router-dom"
import { orange } from '@mui/material/colors';
import { useSelector } from 'react-redux'
import PersonIcon from '@mui/icons-material/Person';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import {useCookiesContext} from "../../utils/CookieManager"
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SellIcon from '@mui/icons-material/Sell';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';



export default function CustomerHeader(props) {
    const [open, setOpen] = useState(false);
    let menuRef = useRef();
    const { cookies ,removeCookie, setCookie} = useCookiesContext();

useEffect(() => {
    let handler = (e)=>{
    if(!menuRef.current.contains(e.target)){
        setOpen(false);}      };
    document.addEventListener("mousedown", handler);
    return() =>{document.removeEventListener("mousedown", handler);}

  });
    const cart = useSelector(state=>state.cart)
    let total = 0
    let itemCount = cart? cart.cartItems.map(item=>{total += item.quantity}) : "" 
    const location = useLocation();
    const navigate = useNavigate();
    const {setActiveSearch, activeSearch,setData} = props
    const select = [ "All", "CLOTHES", "AUTOMOTIVE","BABY","BEAUTY","BOOKS","COMPUTER","DEALS","MUSIC","ELECTRONICS","KITCHEN","SCIENTIFIC",
        "SOFTWARE","SPORT","TOOLS","TOYS","GAMES","SHOES"]
    const [query, setQuery] = useState({keyword: "", category : ""})
    const disp = window.innerWidth< 1000? {display: "none"}:{}

    const handleCategory =(category)=>{

        if(category=="All"){
            category = ""
        }
        
        axios.get(`${import.meta.env.VITE_API_URL}/api/product?category=${category}`)
        .then(res => {setData(res.data); 
navigate(`/`)
            })
        .catch(error=>{console.log(error)})
        
    }


    function  handleSubmit(evt){
        evt.preventDefault()
        setActiveSearch(false)
        if(location.pathname !== "/"){
            navigate(`/`);}
            

        axios.get(`${import.meta.env.VITE_API_URL}/api/product?keyword=${query.keyword}${query.category? `&category=${query.category}` :""}`, )
        .then(res => {setData(res.data)
            navigate(`/`)
        })
        .catch(error=>{console.log(error)})
    
        
    }
    let cSearch = activeSearch? `activespan` :""
    let cSubmit = activeSearch? `activesubmit` :""

    
    const handleChange=(evt)=>{
        setQuery(prev => {
            return (
                {...prev, [evt.target.name]:evt.target.value}
            )
        })
    }

const handleLogout=()=>{
    
    setCookie("token", "")
    setCookie("firstName", "")
    setCookie("role" , "")
    setCookie("expiryDate" , "")
    setCookie("userId" , "")
    navigate("/")
    setOpen(false)
}

return (
    <div className='customerheader'>
        <div className="header">
        <div className="logo">
            
            <div className='logoPicture'><Link to="/"><img src={Merkato} height="40px" alt="" /></Link></div>
                

                { window.innerWidth>= 768 && <div className="searchbar" key={"upperform"}>
        <form action="" onSubmit={handleSubmit}>
            <span className={cSearch} >
                <input  name="keyword" onFocus={()=>{setActiveSearch(true)}} id='search' placeholder='Search anything here' onChange={handleChange}  value={query.keyword} type="search" />
                <select onChange={handleChange} name="category" >
                    <option  value="">All</option>
                    {select.map(opt => <option  key={opt} value={opt}>{opt}</option>)}
                </select>
                
            
                <input id="submit"  className={cSubmit} type="submit" value="Search" />
            </span>
        </form>
    </div>}
                <div  className="authenthication">
                
                    <div className="cart" onClick={()=>{navigate("/cart")}}>
                        
                        <ShoppingBasketIcon sx={{ color: "white", fontSize: 30  }} /> <p>{total>0?total : ""}</p></div>

        <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
        <PersonIcon sx={{ color: "white", fontSize: 30  }} />
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} onClick={()=>setOpen(false)} >
                    <h3>{cookies.firstName} <br /> <span>{cookies.role==="undefined"? "Customer":cookies.role}</span></h3>
                    <ul>
                        {cookies.token && <DropdownItem icon={<Person2OutlinedIcon sx={{ color: orange[500], fontSize: 30  }} />} to="/account/profile" text = {"My profile"} />}
                        {cookies.token && <DropdownItem icon={<DashboardIcon sx={{ color: orange[500], fontSize: 30  }} />} to="/account/dashboard" text = {"Dashboard"} />}
                        {cookies.token && <DropdownItem icon={<SellIcon sx={{ color: orange[500], fontSize: 30  }} />} to={"/account/sell"} text = {"Sell"}/>}
                        { <DropdownItem icon={<FmdGoodIcon sx={{ color: orange[500], fontSize: 30  }} />} to={"/order-tracker"} text = {"Tracker"}/>}
                        {cookies.role && cookies.role.includes("Adminstration") && <DropdownItem icon={<AdminPanelSettingsIcon sx={{ color: orange[500], fontSize: 30  }} />} to={"/adminstration"} text = {"Adminstration"}/>}
                        {cookies.token && <DropdownItem icon={<LogoutOutlinedIcon sx={{ color: orange[500], fontSize: 30  }} />} onclick={handleLogout} text = {"Logout"}/>}
                        
                        {!cookies.token && <DropdownItem  to={"/account/login"} icon={<LoginOutlinedIcon sx={{ color: orange[500], fontSize: 30  }} />}  text = {"Login"}/>}
                        
                        
                        
                    </ul>
                </div>
            </div>
            
        </div>
            </div>

        { window.innerWidth< 768 && <div className="searchbar" key={"upperform"}>
        <form action="" onSubmit={handleSubmit}>
            <span className={cSearch} >
                <input name="keyword" onClick={()=>setActiveSearch(true)} id='search' placeholder='Search anything here' onChange={handleChange}  value={query.keyword} type="search" />
                <select onChange={handleChange} name="category" >
                    <option  value="">All</option>
                    {select.map(opt => <option  key={opt} value={opt}>{opt}</option>)}
                </select>
                
            
                <input id="submit"  className={cSubmit} type="submit" value="Search" />
            </span>
        </form>
    </div>}
        </div >
        <div className='upperBottomCategories' style={disp}>
            
            <div className="categories">
                {select.slice(0, 10).map(opt =><span key={opt}> <button onClick={()=>handleCategory(opt)} key={opt} >{opt}</button></span>)}
            </div>
        </div>
    </div>
  )
}

function DropdownItem(props){

    return(
        <li className="dropdownItem" onClick={props.onclick}>
            {props.icon}
            <Link to={props.to}>{props.text}</Link>
        </li>
    )
}