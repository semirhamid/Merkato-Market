
import "./list.scss"
import Sidebar from "./Component/sidebar/Sidebar"
import Navbar from "./Component/navbar/Navbar"

const List = () => {
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <Navbar/>
        {/* <Datatable/> */}
      </div>
    </div>
  )
}

export default List