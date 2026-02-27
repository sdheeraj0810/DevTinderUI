import axios from "axios";
import { baseURL } from "../utils/constants";
import { useEffect, useState } from "react";

const Connections=()=>{
    const [myconnections,setmyconnections]=useState([]);
    const fetchConnections= async ()=>{
        try{
            const resData=await axios(baseURL+"user/connections",{withCredentials:true});            
            if(resData?.status==200){
                setmyconnections(resData.data.data);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchConnections();
    },[]);
    return (
        <div className="flex flex-col items-center justify-center my-4">
           <h1 className="text-2xl mb-4">Connections</h1>
           <div className="flex flex-col justify-start min-w-sm">
            {myconnections?.map(item => (
                <div key={item._id} className="bg-base-300 card card-side shadow-sm mb-2 flex flex-row px-4">
                
                <div className="avatar items-center">
                <div className="ring-secondary ring-offset-base-100 h-24 w-24 rounded-full ring-2 ring-offset-2">
                    <img src={item.photoUrl} />
                </div>
                </div>
                
               
                <div className="card-body p-4">
                    <div className="flex flex-row gap-2 items-center">
                    <h2 className="card-title">{item.firstName + " " + item.lastName} </h2>
                    <p>{item.age}</p>
                    </div>
                    <p>{item.about}</p>
                    <p>Skills: {item.skills?.join(", ")}</p>
                    {/* <div className="card-actions justify-end">
                    <button className="btn btn-primary">Watch</button>
                    </div> */}
                </div>
                </div>                
            ))}
            </div>
        </div>
    )
}

export default Connections;