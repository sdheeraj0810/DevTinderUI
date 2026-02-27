import axios from "axios";
import { baseURL } from "../utils/constants";
import { useEffect, useState } from "react";

const Requests=()=>{
    const [requests,setrequests]=useState([]);
    const [showtoastmessage, setshowtoastmessage]=useState(""); 
    
    const fetchRequests= async ()=>{
        try{
            const resData = await axios(baseURL+ "user/requests/intrested",{withCredentials:true});
            if(resData.status==200){
                setrequests(resData.data.data);                
            }
        }   
        catch(err) {
            console.log(err);
        }
    }
    const handleRequest = async (requestId,status) =>{
        try{
            console.log(requestId,status);
            const resData = await axios.post(baseURL+"request/review/"+status+"/"+requestId,{},{withCredentials:true});
            console.log(resData);
            if(resData.status==200){
                setshowtoastmessage("Request "+status+" successfully.");
                setTimeout(() => {
                    setshowtoastmessage("");
                }, 3000);
                fetchRequests(); //ideally the request should be saved in store and each request can be removed once updated from store
            }

        }
        catch(err){
            console.log(err);
        }
        
    }

    useEffect(()=>{
        fetchRequests();
    },[]);
    

    return (
        <div className="flex flex-col items-center justify-center my-4">
             {showtoastmessage!="" && (
            <div className="toast toast-top toast-end mt-20 z-10" >            
                <div className="alert alert-success">
                    <span>{showtoastmessage}</span>
                </div>
            </div>
            )}
           <h1 className="text-2xl mb-4">Requests</h1>
           <div className="flex flex-col justify-start min-w-sm">
            {requests.length==0 && (<p>No active requests.</p>)}
            {requests?.map(item => (
                <div key={item.fromUserId._id} className="bg-base-300 card card-side shadow-sm mb-2 flex flex-row gap-4 px-4">
                <div className="avatar items-center">
                <div className="ring-secondary ring-offset-base-100 h-24 w-24 rounded-full ring-2 ring-offset-2">
                    <img src={item.fromUserId.photoUrl} />
                </div>
                </div>
                <div className="card-body p-4">
                    <div className="flex flex-row gap-2 items-center">
                    <h2 className="card-title">{item.fromUserId.firstName + " " + item.fromUserId.lastName} </h2>
                    <p>{item.fromUserId.age}</p>
                    </div>
                    <p>{item.fromUserId.about}</p>
                    <p>Skills: {item.fromUserId.skills?.join(", ")}</p>                    
                    <div className="card-actions justify-between"  >
                        <button  className="btn btn-circle bg-blue-400" title="Reject" onClick={()=>handleRequest(item._id,"rejected")}>
                        <svg xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <button className="btn btn-circle bg-red-400" title="Accept" onClick={()=>handleRequest(item._id,"accepted")}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="size-[1.2em]"><path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" /></svg>
                        </button>                    
                    </div>
                </div>
                </div>                
            ))}
            </div>
        </div>
    )
}

export default Requests;