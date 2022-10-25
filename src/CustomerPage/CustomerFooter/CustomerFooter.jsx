import { Input } from '@material-ui/core'
import React, {useState} from 'react'
import {Link, useLocation} from "react-router-dom"
import './customerfooter.scss'
import Payments from './payments.png'

export default function CustomerFooter() {
    
    const footerData = [
        {
            id:  2,
            title :"Info",
            items: [{name: "Search", link: "/"},{name: "FAQ's", link: "/faq"}, {name: "Delivery Info", link: "/deliveryinfo"},{name: "Refunds & Exchanges", link: "/refund-policy"},{name: "Corporate Gifting"},{name: "Our Principles", link: "/principles"},{name: "Reviews", link: "/customer-reviews"}]
        },
        {
            id:  1,
            title :"Gebeyas",
            items: [{name: "Search", link: "/"},{name: "Tracker", link: "/order-tracker"},{name: "Report Spam", link: ""}, {name: "Delivery Info", link: "/deliveryinfo"},{name: "Services", link: "/"},{name: "Gifting"},{name: "Aims", link: "/principles"}]
        },
        {
            id:  3,
            title :"Quick Links",
            items: [{name: "Home", link: "/"},{name: "About us", link: "/about"}, {name: "Contact us", link: "/contact"},{name: "Wishlist", link: "/cart"}]
        }
        
    ]

    const footerCard = footerData.map(item => <div key={item.id} className='footerItem'>
            <h5>{item.title}</h5>
            {item.items.map(links=>
            <span key={links.name}><Link to={links.link} className={item.classn} key={links}>
                {links.name}
            </Link></span>)}
        </div>)



  return (
    <div className='customerfooter' >
        <Link to="">
        <div className='top' href="#">
            Back to top
        </div></Link>

        <div className="middle">
            
{footerCard}
<div className='footerItem inputbox '>
            <h5>Join our mailing list</h5>
           <form>
            <input id="email" type="email" placholder="Enter email here" />
           <input id="submit" type="button" value="Subscribe"/>
           </form>

           
</div>
        </div>
        

        <div className="bottom">
            

            <div className="payments">
<img src={Payments} alt="payment methods" />
            </div>
            <div className='agreement'>
            <span>
                <Link className='bottomlink'>Conditions of use</Link>
            </span>
            <span>
                <Link>Privacy notice</Link>
            </span>
            <span>
                <Link>Interest-Based Ads Notice</Link>
            </span>
            
                
            </div>

            <h4>
                ©2022 MerkatoGebeya.com, Inc
            </h4>
        </div>

    </div>
  )
}
