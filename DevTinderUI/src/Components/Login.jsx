import { useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom";
import { addUser } from "../utils/userSlice";
import Navbar from "./navbar";
import {baseURL} from "../utils/constants";


const Login=()=>{
    const [emailId, setEmailId]=useState("supriyagupta@gmail.com"); 
    const [password, setpassword]=useState("supriya@123"); 
    const dispatch = useDispatch();
    const navigate=useNavigate();

    const handleSignin = async ()=> {
        try{
            const res= await axios.post(baseURL+ "login",{
                "emailId":emailId,
                "password":password        
            },{withCredentials:true});

            console.log(res);
            if(res?.status==200) { 
                dispatch(addUser(res.data.data));
                navigate("/")
            }        
        }
        catch(err) {
            console.log(err);
        }     
    }

    return (
        <>
        <Navbar />
        <div className="flex justify-center h-screen items-center">
          <div className="card card-border bg-base-300 w-96 ">
        <div className="card-body">
            <h2 className="card-title mb-4">Login</h2>
            <div>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">User ID</legend>
                <input value={emailId} onChange={(e)=>setEmailId(e.target.value)} type="text" className="input w-full" placeholder="Username/Email" />
                
                <legend className="fieldset-legend">Password</legend>
                <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" className="input w-full" placeholder="Password" />

                 <button className="btn btn-primary mt-8" onClick={handleSignin}>Login</button>

                </fieldset>

            </div>
        </div>
        </div>
        </div>
        </>
    )
}

export default Login;