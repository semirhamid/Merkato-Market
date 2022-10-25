import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { addToCart, decreaseCart } from '../../store/cartSlice';
import { useSelector, useDispatch } from 'react-redux'


export default function QuantityButtons(props) {

  const {stock,productId } = props
   const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart)
    let cartItems = !cart ? [] : cart.cartItems

  function handleIncrement(){
    dispatch(addToCart(productId))
  };

  function handleDecrement(){
    dispatch(decreaseCart(productId))
  };
  let currentQuantity = cartItems.find(product => product.id=== productId.id)?cartItems.find(product => product.id=== productId.id).quantity : 0

  return (
    <div><ButtonGroup size="small" aria-label="small outlined button group">
      {<Button variant="contained" disabled = {currentQuantity <= 1 ? true: false } onClick={handleDecrement}>-</Button>}
        {<Button  disabled>{currentQuantity}</Button>}
        <Button  variant="contained" disabled = {currentQuantity === stock ? true: false } onClick={handleIncrement}>+</Button>
        
      </ButtonGroup></div>
  )
}
