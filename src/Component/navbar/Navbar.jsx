import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import FullscreenExitOutlinedIcon from "@mui/icons-material/FullscreenExitOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import MenuIcon from '@mui/icons-material/Menu';
import { useContext } from "react";
import MerkatoLogo from "../../Authethication/merkatologodark.png"

const Navbar = ({openSidebar}) => {


  return (
    <div className="navbar">
      
      <div className="wrapper" onClick={openSidebar}>
        <div className="menu">
          <MenuIcon />
        </div>
         <div className="top">
            <span className='logo'><img src={MerkatoLogo} alt="" /></span>
        </div>


      </div>
    </div>
  );
};

export default Navbar;
