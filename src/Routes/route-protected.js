import ManageRoles from "../Adminstration/ManageRoles"
import EditRole from "../Adminstration/EditRole"
import ManageUsers from "../UserManagement/ManageUsers"
import AddProduct from '../AddProduct'
import Orders from  "../CustomerPage/Products"
import SingleUser from "../UserManagement/SingleUser"
import New from "../New"
import Order from "../Component/Orders/Order"
import Delivery from "../Component/Delivery/Delivery"
import AdminDashboard from "../AdminDashboard"
import AdminHome from "../AdminHome"
// import withPaginationHOC from "../utils/withPaginationHOC"

const protectedRoutes = [
    {  path:"/admin" ,component: AdminHome },
    {  path:"/addproduct" ,component: AddProduct },
    {  path:"/orders" , component: Orders },
    {  path:"/manageroles" , component:ManageRoles },
    {  path:"/editrole/:id" , component:EditRole },
    {  path:"/admin/manageusers" , component:ManageUsers },
    {  path:"/admin/manageusers/:id" , component:SingleUser },
    {  path:"/admin/dashboard" , component:AdminHome },
    {  path:"/admin/products/new" , component:New },
    {  path:"/admin/orders" , component:Order },
    {  path:"/admin/delivery" , component:Delivery }


]

export default protectedRoutes