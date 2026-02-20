import axios from "axios";
import { baseURL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed=()=>{
    const dispatch=useDispatch();
    const feed=useSelector(store=>store.feed);
    const getFeed = async () => {
        try {
            const resData=await axios.get(baseURL+"user/feed",{
                withCredentials:true
            });
            dispatch(addFeed(resData.data))
        }
        catch (err) {
            console.log(err);
        }
    }
    useEffect(()=>{
        getFeed();
        
    },[]);
    
    if(!feed) return (<div>No users available</div>)
    return (
        <div className="flex justify-center">          
           <UserCard userData={feed[0]}></UserCard>
        </div>
    )
}

export default Feed;