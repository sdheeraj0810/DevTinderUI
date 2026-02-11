import { Outlet } from "react-router-dom";
import Navbar from "./navbar"
import Footer from "./Footer";

const Body=()=>{
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default Body;