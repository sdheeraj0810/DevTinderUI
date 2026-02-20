/* eslint-disable react-hooks/set-state-in-effect */
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseURL } from "../utils/constants";
import UserCard from "./UserCard";

const EditProfile=()=>{
    const dispatch = useDispatch();
    
    const user=useSelector((store)=>store.user);
    const [error, seterror]=useState(""); 
    const [showtoast, setshowtoast]=useState(false); 

    const [firstName,setfirstName] = useState("");
    const [lastName,setlastName] = useState("");
    const [skills,setskills] = useState([]);
    const [photoUrl,setphotoUrl] = useState("");
    const [about,setabout] = useState("");
    const [age,setage] = useState(0);
    const [gender,setgender] = useState("");
    useEffect(()=>{
        if(user) {
            setfirstName(user.firstName);
            setlastName(user.lastName);
            setskills(user.skills);
            setphotoUrl(user.photoUrl);
            setabout(user.about);
            setage(user.age);
            setgender(user.gender);
        }
    },[user]);
    
    const handleSave = async ()=>{
        try{
            seterror(""); 
            let userUpdated={
                "firstName":firstName,
                "lastName":lastName,
                "skills":skills,
                "photoUrl":photoUrl,
                "about":about,
                "age" : age,
                "gender": gender
            };
            const resData=await axios.patch(baseURL+"profile/edit",userUpdated,{withCredentials:true});
            console.log(resData);           
            if(resData?.status==200)
            {
                dispatch(addUser(resData.data.data));
                setshowtoast(true);
                setTimeout(() => {
                    setshowtoast(false);
                }, 3000);
                
            }             
        }
        catch(err) {
            console.log(err);
            seterror(err?.response?.data);
        }
    }
    if(!user) return (<div>No user data</div>)
    return (
         <div className="flex justify-center overflow-auto pt-5 gap-4">
            {showtoast && (
            <div className="toast toast-top toast-end mt-20 z-10" >            
                <div className="alert alert-success">
                    <span>Profile saved successfully.</span>
                </div>
            </div>
            )}

          <div className="card card-border bg-base-300 w-96 ">
            <div className="card-body">
                <h2 className="card-title mb-4">Edit profile</h2>
                <div>
                    <fieldset className="fieldset">

                    <legend className="fieldset-legend">First name</legend>
                    <input value={firstName} onChange={(e)=> { seterror(""); setfirstName(e.target.value); } }
                     type="text" className="input w-full" placeholder="First name" />
                    
                    <legend className="fieldset-legend">Last name</legend>
                    <input value={lastName} onChange={(e)=>{seterror(""); setlastName(e.target.value);}} 
                    className="input w-full" placeholder="Last name" />

                    <legend className="fieldset-legend">Skills</legend>
                    <input value={skills} onChange={(e)=>{seterror(""); setskills(e.target.value);}} 
                    className="input w-full" placeholder="Comma separated" />

                    <legend className="fieldset-legend">Photo Url</legend>
                    <input value={photoUrl} onChange={(e)=> {seterror(""); setphotoUrl(e.target.value); } }
                     type="text" className="input w-full" placeholder="Photo Url" />

                     <legend className="fieldset-legend">About me</legend>
                    <textarea value={about} onChange={(e)=> {seterror(""); setabout(e.target.value); } }
                     type="text" className="input w-full" placeholder="About me" />

                    <legend className="fieldset-legend">Age</legend>
                    <input type="number" className="input validator" placeholder="Type a number between 14 to 100" 
                    value={age} onChange={(e)=> {seterror(""); setage(e.target.value); } }
                    min="14" max="100" title="Must be between be 14 to 100"/>                    

                    <legend className="fieldset-legend">Gender</legend>
                     <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn m-1">{gender}</div>
                    <ul tabIndex="-1" className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                        <li><a onClick={()=> {seterror(""); setgender('male'); } } >male</a></li>
                        <li><a onClick={()=> {seterror(""); setgender('female'); } } >female</a></li>
                    </ul>
                    </div>
                    <p className="text-red-500">{error}</p>
                    <button className="btn btn-primary mt-8" onClick={handleSave}>Update profile</button>

                    </fieldset>

                </div>
            </div>
        </div>
        <UserCard preview={true} userData={{firstName,lastName,skills,photoUrl,about,age,gender}}></UserCard>
        </div>
    )
};

export default EditProfile;