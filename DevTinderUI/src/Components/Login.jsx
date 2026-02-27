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
    const [error, seterror]=useState(""); 
    const [showtoastmessage, setshowtoastmessage]=useState(""); 

    const dispatch = useDispatch();
    const navigate=useNavigate();

    const [issignup, setissignup]=useState(false); 
    const [signupemailId, setsignupemailId]=useState(""); 
    const [signuppassword, setsignuppassword]=useState(""); 
    const [firstname, setfirstname]=useState(""); 
    const [lastname, setlastname]=useState(""); 


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
            seterror(err.response.data);
        }     
    }
    const handleSignup = async ()=>{
        try{
            const res= await axios.post(baseURL+ "signup",{
                "firstName":firstname,
                "lastName":lastname,
                "emailId":signupemailId,
                "password":signuppassword        
            },{withCredentials:true});

            console.log(res);
            setsignupemailId("");
            setsignuppassword("");
            setfirstname("");
            setlastname("");
            setshowtoastmessage(res?.data?.message);
            setTimeout(() => {
                setshowtoastmessage("");
            }, 3000);
        }
        catch(err){
            console.log(err);
            seterror(err.response.data);
        }
    }

    return (
        <>
        <Navbar />
         {showtoastmessage!="" && (
            <div className="toast toast-top toast-end mt-20 z-10" >            
                <div className="alert alert-success">
                    <span>{showtoastmessage}</span>
                </div>
            </div>
            )}
        <div className="flex justify-center h-screen items-center">
          <div className="card card-border bg-base-300 w-96 ">
        <div className="card-body">
            <h2 className="card-title mb-4">{issignup? "Sign up":"Login"}</h2>
            {issignup ? (
                <div>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input value={signupemailId} onChange={(e)=> {seterror(""); setsignupemailId(e.target.value); } } type="text" className="input w-full" placeholder="Username/Email" />                
                <legend className="fieldset-legend">First name</legend>
                <input value={signuppassword} onChange={(e)=> {seterror(""); setsignuppassword(e.target.value); } } type="text" className="input w-full" placeholder="Username/Email" />                
                <legend className="fieldset-legend">Last name</legend>
                <input value={firstname} onChange={(e)=> {seterror(""); setfirstname(e.target.value); } } type="text" className="input w-full" placeholder="Username/Email" />                
                <legend className="fieldset-legend">Password</legend>
                <input value={lastname} onChange={(e)=>{seterror(""); setlastname(e.target.value);}} type="password" className="input w-full" placeholder="Password" />
                <p className="text-red-500">{error}</p>
                 <button className="btn btn-primary mt-8" onClick={handleSignup}>Sign up</button>                 
                 <div className="flex justify-end"><a className="text-blue-400 underline cursor-pointer" onClick={()=>setissignup(false)}>Login</a></div>
                </fieldset>
                </div>
            ):(
            <div>
                <fieldset className="fieldset">
                <legend className="fieldset-legend">Email ID</legend>
                <input value={emailId} onChange={(e)=> {seterror(""); setEmailId(e.target.value); } } type="text" className="input w-full" placeholder="Username/Email" />                
                <legend className="fieldset-legend">Password</legend>
                <input value={password} onChange={(e)=>{seterror(""); setpassword(e.target.value);}} type="password" className="input w-full" placeholder="Password" />
                <p className="text-red-500">{error}</p>
                 <button className="btn btn-primary mt-8" onClick={handleSignin}>Login</button>                 
                 <div className="flex justify-end"><span className="mr-2 flex">New user ? </span> <a className="text-blue-400 underline cursor-pointer" onClick={()=>setissignup(true)}>Sign up</a></div>
                </fieldset>
            </div>
        )}
        </div>
        </div>
        </div>
        </>
    )
}

export default Login;