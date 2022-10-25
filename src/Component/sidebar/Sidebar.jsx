import React from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import StoreIcon from "@mui/icons-material/Store";
import InsertChartIcon from "@mui/icons-material/InsertChart";
import SettingsApplicationsIcon from "@mui/icons-material/SettingsApplications";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsSystemDaydreamOutlinedIcon from "@mui/icons-material/SettingsSystemDaydreamOutlined";
import PsychologyOutlinedIcon from "@mui/icons-material/PsychologyOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import "./sidebar.scss"
import {useCookiesContext} from "../../utils/CookieManager"
import {useNavigate, useLocation} from "react-router-dom"
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import StreetviewIcon from '@mui/icons-material/Streetview';



const Sidebar = ({sidebar}) => {
  const navigate = useNavigate()
  const { cookies ,removeCookie} = useCookiesContext();

  const handleLogout = ()=>{
    removeCookie("token")
    removeCookie("firstName")
    removeCookie("role")
    removeCookie("expiryDate")
    navigate("/")
  }
  return (
    <div className={sidebar? "sidebar--open sidebar":"sidebar"}>
        
       
        <div className="center">
          <div className="name">
            Hi, {cookies.firstName}
          </div>
            <ul>
          <p className="title">MAIN</p>
          
          <Link to="/adminstration/dashboard" style={{ textDecoration: "none" }}>
            <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          </Link>

          <p className="title">MANAGEMENT</p>

          <Link to="/adminstration/manageusers" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>

          <Link to="/adminstration/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Products</span>
            </li>
          </Link>
           <Link to="/adminstration/manageroles" style={{ textDecoration: "none" }}>
            <li>
              <SupervisorAccountIcon className="icon" />
              <span>Roles</span>
            </li>
          </Link>
          <Link to="/adminstration/orders" style={{ textDecoration: "none" }} >
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          </Link>
           <Link to="/adminstration/delivery" style={{ textDecoration: "none" }}>
          <li>
            <LocalShippingIcon className="icon" />
            <span>Vehicles</span>
          </li>
          </Link>
          
          
          <p className="title">ACCOUNT</p>
          <Link to="/adminstration/profile" style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Profile</span>
          </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
          <li>
            <StreetviewIcon className="icon" />
            <span>User View</span>
          </li>
          </Link>
          <li onClick={handleLogout}>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
        </div>
    </div>
  )
}

export default Sidebar