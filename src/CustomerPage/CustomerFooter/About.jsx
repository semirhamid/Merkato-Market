import React from 'react'
import "./about.scss"
import Banner from "./store_packages.png"

export default function About() {
  return (
    <div className='aboutus'>
        <h3 className='main-title'>About us</h3>
        <p className='title-description'>Merkato Market is the largest online shopping site in the Africa</p>
        <div className="banner" >
            {/* <img src={Banner} alt="" /> */}
        </div>
        <p className="main">
            <strong> MerkatoMarket.com </strong>is an ecommerce platform that sells many product lines, include media (books, movies, music, and software), apparel, baby products, consumer electronics, beauty products, gourmet food, groceries, health and personal care products, industrial & scientific supplies, kitchen items, jewelry, watches, lawn and garden items, musical instruments, sporting goods, tools, automotive items, toys and games, and farm supplies and consulting services. Merkato Market websites are country-specific (for example, Merkato Market.com for the U.S. and Merkato Market.fr for France), though some offer international shipping.
        </p>
        <p className="me">
            <strong> Merkato Market</strong> was founded by Semir Hamid from his garage in Shashemene, Ethiopia, on July 5, 2022. Initially an online marketplace for games, it has expanded into a multitude of product categories, a strategy that has earned it the moniker The Everything Store.It has multiple subsidiaries including Merkato Printing Services . Its other subsidiaries include Cinema Movies. Its acquisition of  Cinema Movies in August 2022 for 0 birr substantially increased its footprint as a physical retailer.
        </p>

    </div>
  )
}
