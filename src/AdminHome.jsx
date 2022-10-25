import React,{useState} from 'react'
import './adminhome.scss'
import { Outlet } from 'react-router-dom';
import SideBar from "./Component/sidebar/Sidebar"
import Navbar from './Component/navbar/Navbar';

export default function AdminHome() {
  const [sidebar, setSidebar] = useState(false)
  const toogleSidebar= ()=>{
    setSidebar(prev => !prev)
  }
 
  return (
    <div className='home'>
      <Navbar openSidebar={toogleSidebar}/>
      <div className="mainContainer" onClick={toogleSidebar} >
        <SideBar sidebar={sidebar} />
        <div className={sidebar? "content--open content":"content"} onClick={toogleSidebar}>
          <Outlet />
        </div>
      </div>
      

    </div>
  );
}


