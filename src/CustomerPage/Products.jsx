import React, {useState,useRef, useEffect} from "react";
import Product from "./Product"
import CustomerFooter from "./CustomerFooter/CustomerFooter";
import ShopSecure from "./SecuredPayment/ShopSecure"
import CustomerHeader from "./CustomerHeader/CustomerHeader";
import MainContent from "./MainContent/MainContent"
import Featured from "./MainContent/Featured"
import ProductDetail from "./ProductDetail/ProductDetail";
import "./products.scss"
import { Outlet , useLocation} from "react-router-dom";
import {formatCurrency} from "../utils/formatCurrency"

function Products(props){
    const[activeSearch , setActiveSearch] = useState(false);
    const [requestedQuery, setRequestedQuery]= useState()
    const [data, setData] = useState([])
    const location = useLocation()

    const activeBlur = activeSearch? {zIndex:"20", minHeight: "100%",width:"100%", opacity: "0.7", position:"absolute", background:"rgba(0,0,0,.6)",overflow:"hidden", top:"0",right:"0",left:"0",bottom:"0"} : {}

    return(
        
        <div className="products" >
            <CustomerHeader setData={setData} activeSearch={activeSearch} setActiveSearch={setActiveSearch}  />
            <div  onClick={()=>setActiveSearch(false)} style={activeBlur}>
            </div>
            <div className="productsBody">
            <Outlet context={[data, setData,requestedQuery]}  />
            </div>

            <ShopSecure />
            <CustomerFooter />
        </div>
    )
}

export default Products 