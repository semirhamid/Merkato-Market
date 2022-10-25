import React from 'react'
import { Outlet } from "react-router-dom";
import "./accountcontainer.scss"

export default function AccountContainer() {
  return (
    <div className='accountContainer'>
      <div className="outletContainer">
        <Outlet />
      </div>
    </div>
  )
}
