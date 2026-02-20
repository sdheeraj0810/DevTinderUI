/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseURL } from "../utils/constants";
// import { useEffect } from "react";

const Navbar = () =>{
    const user= useSelector((store)=>store.user);
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handleLogout = async () =>{
        try{
            const res= await axios.post(baseURL+"logout",{},{ withCredentials:true } );
            console.log(res);
            if(res.status==200) {
                dispatch(removeUser());
                navigate("/login");
            }
        }
        catch(e) {
            console.log(e);
        } 
    }
    // useEffect(()=>{
    //     if(!user) {
    //         navigate("/login");
    //     }
    // },[user]);
    
    return (
        <div className="navbar bg-base-300 shadow-sm">
        
        <div className="navbar-start">
        {user && (
        <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
            <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a>Item 1</a></li>
            <li>
                <a>Parent</a>
                <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
                </ul>
            </li>
            <li><a>Item 3</a></li>
            </ul>
        </div>
        )}
        <Link to="/" className="btn btn-ghost text-xl">👥 DevTinder</Link>
        </div>
        {user && (
        <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
            <li><a>Item 1</a></li>
            <li>
            <details>
                <summary>Parent</summary>
                <ul className="p-2 bg-base-100 w-40 z-1">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
                </ul>
            </details>
            </li>
            <li><a>Item 3</a></li>
        </ul>
        </div>
        )}
        {user && (
        <div className="navbar-end">
        <div className="flex gap-2 mr-4 items-center">    
            {user.firstName + " " + user.lastName}
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                    <img
                        alt="Tailwind CSS Navbar component"
                        src={user?.photoUrl} />
                    </div>
                </div>
                <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                    <li>
                    <Link to="/editprofile" className="justify-between">
                        Profile
                        {/* <span className="badge">New</span> */}
                    </Link>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
         </div>
    </div>
    )}
    </div>
    )
}

export default Navbar;