import React,{useContext, useState} from 'react'
import { multiStepContext } from '../../../StepContext'
import "./secondstep.scss"
import { useSelector, useDispatch } from 'react-redux'
import { DataGrid} from '@mui/x-data-grid';
import {formatCurrency} from "../../../utils/formatCurrency"

export default function SecondStep() {
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cart)
  let cartItems = !cart ? [] : cart.cartItems
  let total = 0
  const {setStep, addressData, setaddressData} = useContext(multiStepContext)

const columns= [
  { field: 'id', headerName: 'ID' , width: '30' },
  { field: 'name', headerName: 'Product name', width: 500 },
  { field: 'quantity', headerName: 'Quantity'},
  { field: 'price', headerName: 'Price' }
];

const rows = cartItems.map(item => ({id:item.id,name:item.name,quantity:item.quantity, price:item.quantity * item.price}))
  
  return (
    <div className="secondstep">
      {cartItems.map(item=>{total += item.quantity * item.price})}
    <div className='table' style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        
      />
    </div>

    <div className="total">
      <h3>Total Price: US {formatCurrency(total*0.95)}</h3>
    </div>
    <div className="buttons">
        <button onClick={()=>setStep(1)}>Back</button>
        <button  onClick={()=>setStep(3)}>Next</button>
        </div>
    </div>
  )
}
