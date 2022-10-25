import React, {useContext} from 'react'
import "./firststep.scss"
import CBE from "../Assets/Cbe-Logo.png"
import TeleBirr from "../Assets/TeleBirr-Logo.svg"
import { multiStepContext } from '../../../StepContext'

export default function FirstStep() {
  const {setStep, paymentMethod, setPaymentMethod} = useContext(multiStepContext) 
  
  return (
    <div className='firstStep'>
        <h1 id='payment'>Choose a payment method</h1> 
        <div className="payments">
          <label>
              <input type="radio" name="payment" onClick={()=>setPaymentMethod("cbe")} value="cbe"  />
              <img src={CBE} alt="Option 1" />
          </label>

          <label>
            <input type="radio" onClick={()=>setPaymentMethod("telebirr")} name="payment" value="telebirr" />
            <img src={TeleBirr} alt="Option 2" />
          </label>


        </div>
        <div className="buttons">
        <button disabled={!paymentMethod} onClick={()=>setStep(2)}>Next</button>
        </div>
    </div>
  )
}
