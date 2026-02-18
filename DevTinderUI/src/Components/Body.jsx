/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./navbar"
import Footer from "./Footer";
import axios from "axios";
import { baseURL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body=()=>{
    const dispatch = useDispatch();
    const navigate=useNavigate();
    const userData=useSelector((store)=>store.user);
    
    const fetchUserProfile = async () => {
        try {
            if(!userData){
                const userProfile= await axios.get(baseURL+"profile",{
                    withCredentials:true
                });
                dispatch(addUser(userProfile.data));
            }
        }
        catch (err) {
            console.log('err',err);
            if(err.status==401) {
                navigate("/login");
            }
        }
    }
    useEffect(()=>{
        fetchUserProfile(); 
    },[]);
    
    return (
        <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    )
}

export default Body;