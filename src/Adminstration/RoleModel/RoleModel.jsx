import "./rolemodel.scss";
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import {useNavigate } from "react-router-dom";
import axios from "axios"
import { useCookiesContext } from "../../utils/CookieManager";


const RoleModel = (props) => {
  const navigate = useNavigate()
  const {cookies} = useCookiesContext()
  const {id,  name, setResponse } = props


function handleDelete(){
    axios.delete(`${import.meta.env.VITE_API_URL}/api/adminstration/${id}`, {
            headers: {"Authorization" : `Bearer ${cookies.token}`}})
        .then(res => {
            setTimeout(()=>{setResponse(res.data.message)},2000)
            setResponse("")
        })
   }
const colors = ["red","green","blue","orange","purple"]
  return (
    <div className="rolewidget">
      <div className="left">
        <span className="title" hidden>{id}</span>
        <span className="counter">

          <AdminPanelSettingsIcon sx={{ color: colors[Math.floor(Math.random() * 5)], fontSize :40 }} /> <div className="rolelabel">
            {name}
          </div>
        </span>
      </div>
      <div className="right">
        <button className="editbutton" onClick={()=>{navigate(`/adminstration/editrole/${id}`)}}>Edit</button>
        <button className="deletebutton" onClick={handleDelete}>Delete</button>
      </div>
    </div>
  );
};

export default RoleModel;
