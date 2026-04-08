import io from "socket.io-client";
import { baseURL } from "./constants";

export const createSocketConnection= ()=>{
    return io(baseURL); //only for local
};