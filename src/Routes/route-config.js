import DetailsProduct from "../DetailsProduct"
import Register from "../Authethication/Register"
import Login from "../Authethication/Login"
import ConfirmEmail from "../Authethication/ConfirmEmail"
import ForgetPassword from "../Authethication/ForgetPassword"
import ResetPassword from "../Authethication/ResetPassword"
import Product from "../CustomerPage/Products"
import AdminHome from "../AdminHome"
import List from "../List"
import Products from  "../CustomerPage/Products"
import ProductDetail from "../CustomerPage/ProductDetail/ProductDetail"


const routes = [
        // {  path:"/" , component: Products , exact: true},
        {  path:"/product/details/:productId" , component: ProductDetail },
        {  path:"/register" , component:Register },
        {  path:"/login" ,component:Login },
        {  path:"/confirmEmail" , component:ConfirmEmail },
        {  path:"/forgetpassword" , component:ForgetPassword },
        {  path:"/resetpassword/:email/:token" , component:ResetPassword },
        {  path:"/adminstration/list" , component:List },
        {  path:"/" , component:Products }
        
    

]

export default routes;