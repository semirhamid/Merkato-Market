import React,{useContext, useState} from 'react'
import { multiStepContext } from '../../../StepContext'
import "./thirdstep.scss"

export default function Third() {
  const {setStep, addressData, setaddressData} = useContext(multiStepContext)

  function handleChange(evt){
    setaddressData(prev =>({...prev, [evt.target.name]:evt.target.value}))
  }
  function handleSubmit(){
    
  }



  return (
    <div className='secondstep'>
      <form action="" onSubmit={handleSubmit}>
        <div className="addressBar">
          <h5>Add delivery address</h5>

          <div className="fullname Address">
            <label htmlFor="fullname">
            <p>Full Name</p>  </label>
            <input onChange={handleChange} required id='fullname'  name='fullname' value={addressData.fullname || ""} type="text"  />
          </div>
          
          <div className="zipcode Address">
            <label htmlFor="zipcode">
            <p>PostCode</p>  </label>
            <input onChange={handleChange} required id='zipcode'  name='zipCode' value={addressData.zipCode || ""} type="number"  />
          </div>

          <div className="address Address">
            <label htmlFor="address">
            <p>Address Line</p>  
            <input onChange={handleChange} required id='address'  name='address' value={addressData.address || ""} type="text"  />
          </label> 
          </div>
          
          <div className="city Address">
            <label htmlFor="city">
            <p>City</p>  </label>
            <input onChange={handleChange} required id='city'  name='city' value={addressData.city || ""} type="text"  />
          </div>
          
          <div className="region Address">
            <label htmlFor="region">
            <p>Region</p>  </label>
            <input onChange={handleChange} required id='region'  name='region' value={addressData.region || ""} type="text"  />
          </div>

          
          <div className="country Address">
            <label htmlFor="country">
            <p>Country</p>  </label>
            <input onChange={handleChange} required id='country'  name='country' value={"Ethiopia"} type="text"  />
          </div>
          <input   className='submit' type="submit" value={"Use this address"}/>
          
        </div>
        
        </form>

        <div className="buttons">
        <button onClick={()=>setStep(2)}>Back</button>
        <button  onClick={()=>setStep(4)}>Next</button>
        </div>

        
    </div>
  )
}
