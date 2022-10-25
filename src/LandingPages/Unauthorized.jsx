import React from "react"
import UnAuthorized from "./un authorized.png"
import "./unauthorized.scss"
import { Link } from "react-router-dom"

export default function Unauthorized(){

    return(
        <div className="unauthorized">
            <div className="picture">
                <img src={UnAuthorized} alt="" />
            </div>

            <div className="buttons">
                <Link to="/account">Login as adminstrator</Link>
                <Link to="/">Return Home</Link>
            </div>
        </div>
    )
}