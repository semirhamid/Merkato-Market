import React, { useContext } from 'react'
import "./checkout.scss"
import FirstStep from './Components/FirstStep'
import SecondStep from './Components/SecondStep'
import ThirdStep from "./Components/ThirdStep"
import FourthStep  from "./Components/FourthStep"
import {Stepper, StepLabel, Step} from "@material-ui/core"
import {multiStepContext} from "../../StepContext"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AddCardIcon from '@mui/icons-material/AddCard';
import PaymentOutlinedIcon from '@mui/icons-material/PaymentOutlined';
import { orange } from '@mui/material/colors';


export default function Checkout() {
 
  const {currentStep, addressData, setaddressData} = useContext(multiStepContext)


  function showStep(step){
    switch (step){
      case 1:
        return <FirstStep />
      case 2:
        return <SecondStep />
      case 3:
        return <ThirdStep />
      case 4:
        return <FourthStep />
    }
  }
  function CustomIcon(props){
    const {completed,active} = props
    if(active){
      return <ShoppingCartIcon sx={{ color: orange[500] }} />
    }else if(completed){
      return <ShoppingCartIcon sx={{ color: "green" }} />}};
      

  return (
    <div className='checkout'>
      <div className='header'>
      <div className="stepper">
        <Stepper style={{width:"100%"}}  activeStep={currentStep - 1}  orientation="horizontal">
        <Step>
          <StepLabel StepIconComponent={CustomIcon}>{window.innerWidth >500? "Choose Payment Method" : ""}</StepLabel>
        </Step>
        <Step>
          <StepLabel StepIconComponent={CustomIcon}>{window.innerWidth >500? "Verification" : ""}</StepLabel>
        </Step>
        <Step>
          <StepLabel StepIconComponent={CustomIcon}>{window.innerWidth >500? "Address" : ""}</StepLabel>
        </Step>
        <Step>
          <StepLabel StepIconComponent={CustomIcon}>{window.innerWidth >500? "Summary" : ""}</StepLabel>
        </Step>
      </Stepper>
      </div>
      </div >
      
      {showStep(currentStep)}
      

    </div>
  )
}

// choose bank
// insert to this account this much money
// addresss
// congratulation
