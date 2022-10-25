import React from 'react'
import "./deliveryinfo.scss"
import DeliveryBanner from "./deliverybanner.png"

export default function DeliveryInfo() {
  return (
    <div className='deliveryinfo'>
        <h1>Shipping policy</h1>
        <h2>We deliver by every means</h2>
        <div className="planebanner">
        </div>
        
        <div className="shippingcontainer">
        <div>
        <h2>Shipping Details</h2>
            <p>Please check your address and contact details carefully. If an order is returned to us because of errors or missing information we will need to charge for redelivery or refund the order minus the shipping costs.</p>
        </div>

        <div>
            <h2>Order Processing Times</h2>
            <p>We process orders within 1-2 working days. Orders are dispatched Monday to Friday. We will email you a confirmation when your order has been shipped.

If you need to make any changes to your order please contact us. as soon as you can. We're not able to make any changes to your order once it has been shipped.</p>
        </div>

        <div>
            <h2></h2>
            <p></p>
        </div>


    </div></div>
  )
}
