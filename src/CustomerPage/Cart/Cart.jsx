import React from 'react'
import "./cart.scss"
import QuantityButtons from './QuantityButtons';
import {formatCurrency} from "../../utils/formatCurrency"
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from '@mui/material/colors';
import { useSelector, useDispatch } from 'react-redux'
import { removeFromCart, clearCart } from '../../store/cartSlice';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { orange } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import EmptyCart from "./emptyCart.png"

export default function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const cart = useSelector(state=>state.cart)
    let cartItems = !cart ? [] : cart.cartItems
    let total = 0

    const handleRemoveFromCart=(productId)=>{
        dispatch(removeFromCart(productId))
    }
    const handleClear=()=>{
        dispatch(clearCart())
    }

    return (<>
    <h1 className='shoppingcart'>Shopping Cart</h1>
    {cartItems.length ===0 && <img className="emptycart" src={EmptyCart} alt="empty cart" />}
    {cartItems.length ===0 && <Link id='startShopping' to="/">{"<<"} Start Shopping</Link>}
    <div className='cart'>
        
        <div className="items">
           {cartItems.map(product => <div key={product.id} className="product">
            <div className="image">
                <img src={product.img} alt={product.name} />
            </div>
            <div className="description">
                <h3>{product.name}</h3>
                <div className="actions">
                Quantity
                <QuantityButtons   productId={{id:product.id}} stock={product.stock}/>
            </div>
            </div>
            
            <div className="total">
                    <h3> US {formatCurrency(product.price * product.quantity)}</h3>
                    <p>Free shipping</p>
                    <p>Economy shipping</p>
                    <span ><IconButton sx={{ color: red[300], fontSize: 30 }}  onClick={()=>handleRemoveFromCart({id: product.id})}aria-label="delete" >
        <DeleteIcon /></IconButton></span>
                </div>
        </div>)}
        {cartItems.length > 0 && <button onClick={()=>handleClear()} disabled={cartItems.length ===0?true: false} className='clear'>Clear</button>}
        
        </div>

        <div className="checkout">
            <button id='checkbutton' onClick={()=>{
                navigate("/account/checkout")
            }} disabled={cartItems.length ===0?true: false} >Go to checkout</button>
            <table className='upperTable' >
                <tbody>
                <tr>
                    {cartItems.map(item=>{total += item.quantity * item.price})}
                    <td>Items({cartItems.length})</td>
                    <td className='td'>US {formatCurrency(total)}</td>
                </tr>
                <tr>
                    <td>Shipping</td>
                    <td className='td'>Free</td>
                </tr>
                <tr>
                    <td>Discount</td>
                    <td className='td'>-US {formatCurrency(total*0.05)}</td>
                </tr>
                </tbody>
            </table>
            <table className='lowerTable'>
                <tbody>
                <tr>
                    <th>Subtotal</th>
                    <th id='th'>US {formatCurrency(total*0.95)}</th>
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    </>
    )
}
































// export default function Cart() {
//     
//   return (
//     <div>{JSON.stringify(cart.cartItems)}</div>
//   )
// }

