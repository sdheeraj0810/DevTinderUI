import io from "socket.io-client";
import { baseURL } from "./constants";

export const createSocketConnection= ()=>{
    if(location.hostname=="localhost"){
        return io(baseURL); //only for local
    }
    else {
        return io("/", { path:"/api/socket.io" });
    }
};