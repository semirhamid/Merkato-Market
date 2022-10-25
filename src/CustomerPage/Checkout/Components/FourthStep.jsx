import React, {useState, useContext} from 'react'
import "./fourthstep.scss"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useCookiesContext } from '../../../utils/CookieManager'
import { useSelector, useDispatch } from 'react-redux'
import {multiStepContext} from "../../../StepContext"
import { clearCart } from '../../../store/cartSlice';


export default function FourthStep() {
   const dispatch = useDispatch();
  const {addressData} = useContext(multiStepContext)
  const [car, setCar]= useState(true)
  const navigate = useNavigate()
  const { cookies } = useCookiesContext();
  const cart = useSelector(state=>state.cart)
  let cartItems = !cart ? [] : cart.cartItems

  function handleSubmit(evt){
        evt.preventDefault()
        const url = `${import.meta.env.VITE_API_URL}/api/order`
        const bodyArray = cartItems.map(item=>({ProductID:item.id,Quantity:item.quantity,Country:addressData.country || "Ethiopia",Region:addressData.region,City:addressData.city, Address:addressData.address, ZipCode:addressData.zipCode}))
        axios.post(url,bodyArray, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}}).then((res) => {

        if(res.data.isSuccess===true){
          dispatch(clearCart)
          setTimeout(()=>navigate(`/account/orderconfirmation/${res.data.trackingId}`), 5000)
            
        }
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  return (
    <div className='fourthstep'>
      <form action="" onSubmit={handleSubmit}>
          <h2> Enter the confirmation code from the bank receipt</h2>
          <div className="payment">
            <label htmlFor="ttnumber">
              </label>
            <input required id='ttnumber' placeholder={"TT-"} name='ttnumber' type="text"  />
          
          <button className={car ? "order" : "order animate"}  onSubmit={(evt)=>{setCar(prev => !prev);handleSubmit(evt) }}><span className="default">Complete Order</span><span className="success">Order Placed<svg viewBox="0 0 12 10">
            <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
        </svg></span>
    <div className="box"></div> 
    <div className="truck">
        <div className="back"></div>
        <div className="front">
            <div className="window"></div>
        </div>
        <div className="light top"></div>
        <div className="light bottom"></div>
    </div>
    <div className="lines"></div>
</button>
          </div>
          </form>
    </div>
  )
}
