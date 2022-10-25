import React from 'react'
import "./faq.scss"
import Faq from "react-faq-component";
import { Link } from 'react-router-dom';
export default function FAQ() {

    const data = {
    rows: [
        {
            title: "Orders",
            content: [<div> <div className='faq-small-row'><h3 className='faq-small-title'>What if I need to change my order?</h3>
            <p>Yes. As long as we haven’t shipped your order we will do our best to accommodate any changes. The best way to change an order is to email us at    <Link>support@merkatomarket.com</Link> with your order number and any changes that you need.
                </p> </div>
                <div className='faq-small-row'><h3 className='faq-small-title'>Can I change the delivery address on my order?</h3>
            <p>Yes, as above.
                </p> </div>
                <div className='faq-small-row'><h3 className='faq-small-title'>I haven’t received my order confirmation email</h3>
            <p>First, please double check your spam or junk folder as our order confirmations can sometimes end up there. Still don’t see it? Drop us a line at <Link>support@merkatomarket.com</Link> and we’ll check it out for you.
                </p> </div>
                <div className='faq-small-row'><h3 className='faq-small-title'>My order hasn't arrived</h3>
            <p>First check the tracking link on your order dispatch confirmation.  Is your order showing as delivered, but you haven’t received it? Please double check that the address provided is correct (sometimes autocomplete can cause errors in addresses). Could it have been left with a neighbour or in a ‘safe space’ around your property by the courier? If you still have no luck please do not worry, just drop us an email to <Link>support@merkatomarket.com</Link> with your order number and we will help to figure out what has happened.
                </p> </div>
                </div> ],
        },
        {
            title: "Packaging",
            content:
                <div> <div className='faq-small-row'><h3 className='faq-small-title'>Is your packaging recyclable?</h3>
            <p>We ship all of our orders in 100% plastic-free packaging. All of our packaging is plastic-free and is recyclable and compostable, except for our shipping labels but we’re working on that. We don’t include any paper packing slips in our orders.
                </p> </div>
                <div className='faq-small-row'><h3 className='faq-small-title'>Are your shipping labels compostable?</h3>
            <p>No, but we’re working on it. A bug bear of ours is that our shipping labels are printed with a thermal printer. Thermal printing paper is not recyclable or compostable due to the chemicals used in its manufacture. We’re currently taking part in the Green for Micro programme with our Local Enterprise Office and through that we hope to source a sustainable and biodegradable alternative. Watch this space!
                </p> </div></div>,
        },
        {
            title: "Partnerships & Media Equiries",
            content:
                <div> <div className='faq-small-row'><h3 className='faq-small-title'>Who do I contact about a media opportunity?</h3>
            <p>For any press/media/sponsorship/affiliate enquiries, please direct your message
                </p> </div>
                <div className='faq-small-row'><h3 className='faq-small-title'>My product(s) would be a perfect fit for Merkato Market, who should I speak to?</h3>
            <p>Fantastic, we’d love to hear from you. Drop us an email with the details to <Link>info@merkatomarket.com</Link> We may not be able to get back to you immediately as we are working through a large number of requests.
                </p> </div></div>,
        },
        {
            title: "What is the package version",
            content: <p>current version is 1.2.1</p>,
        },
    ],
};

const dataRight = {
    rows: [
        {
            title: "How do I report fraud / scam or other suspicious items?",
            content: `Each advert has a Report This Ad tab. Click on that immediately and indicate the reasons in the comment box as to why you are reporting that particular advert.
We will receive the report and commence action immediately.

You can also send the advert ID on our Facebook page or send an email or you can simply reach us on any of the numbers at the bottom of the page and someone will respond to the query immediately.`,
        },
        {
            title: "What's the difference between a Private & Business seller?",
            content:
                `Private Seller accounts are for casual selling. If you want to sell that unused item that you have to make extra cash or disposing of an item then you are a private seller.

Business Sellers on the other hand are those that buy items for resale, Sell in bulk quite often, Buy items on behalf of their business and offer services or goods that they have made for resale value.`,
        },
        {
            title: "How do I set up deal?",
            content: `Any seller can have their items on our deals page.

For you to appear on our, go to the ad you want to set as a deal, click on the Actions icon (the 3 dots) and select Deal, indicate the Deal price which should be lower than the original price, indicate the duration you would like the deal to run and then save.

Our moderation team will have a look at it and approve.`,
        },
        {
            title: "What is the package version",
            content: <p>current version is 1.2.1</p>,
        },
    ],
};

const styles = {
    // bgColor: 'white',
    titleTextColor: "black",
    rowTitleColor: "black",
    rowContentColor: 'grey',
    arrowColor: "tint",
    rowContentPaddingLeft: '0.2em',
    rowContentTextSize: '0.9rem'
};
const config = {
    animate: true,
    arrowIcon: "V",
    openOnload: 0,
    expandIcon: "+",
    collapseIcon: "-",
};
  return (
    <div className='faq'>
        <h1 className='faqs-title'>FAQ's</h1>
        <div className="faqs">
<Faq 
                data={data}
                styles={styles}
                config ={config}
               
            />
            <Faq 
                data={dataRight}
                styles={styles}
                config ={config}
               
            />
        </div>
         
    </div>
  )
}
