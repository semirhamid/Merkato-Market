import React from 'react'
import "./contactus.scss"
import { FaInstagram, FaFacebook, FaTwitter, FaSkype } from "https://cdn.skypack.dev/react-icons/fa";

export default function () {
  return (
    <div className='contact-us'>
    <h1>Contact us</h1>
    <p className='contact-p'>If you have a question about an order, want to know more about our products or would like to suggest a new product for us, we'd love to hear from you.</p>
<form>
    <div>
             <label htmlFor="fullname">
        
            <p>Name</p>  </label>
            <input required id='fullname'  name='fullname'  type="text"  />
        </div>
    
          
          <div className="zipcode Address">
            <label htmlFor="zipcode">
            <p>Email</p>  </label>
            <input  required id='zipcode'  name='zipCode'type="email"  />
          </div>
<div className='message'>
<label htmlFor="message">Message</label>
        <textarea id="message" required />
</div>
      
      <button className='button' type="submit">Send</button>
    </form>

    </div>
  )
}
