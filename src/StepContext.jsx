import React, { createContext, useState} from 'react'


export const multiStepContext = createContext()

const StepContextProvider=props => {
    const [currentStep, setStep] = useState(1)
    const [paymentMethod, setPaymentMethod] = useState("")
    const [addressData, setaddressData] = useState({fullname:"",zipCode:"",address:"",city:"",region:"",country:"Ethiopia"})
    return (
        <multiStepContext.Provider value={{currentStep, setStep, paymentMethod, setPaymentMethod, addressData, setaddressData}}>
            {props.children}
        </multiStepContext.Provider>

    )
}

export default StepContextProvider