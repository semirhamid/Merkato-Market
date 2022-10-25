import React from 'react'
import NoFound from "./notfound.png"
import "./notfound.scss"
import {Link} from "react-router-dom"

function NotFound() {
  return (
    <div className="notfound">
            <div className="picture">
                <img src={NoFound} alt="" />
            </div>

            <div className="buttons">
                <Link to="/">Return Home</Link>
            </div>
        </div>
  )
}

export default NotFound