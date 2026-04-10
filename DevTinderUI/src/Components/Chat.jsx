/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../utils/socket";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { baseURL } from "../utils/constants";
//import { addChats } from "../utils/chatSlice";


const Chat=()=>{
    const { id } = useParams();
    const loggedInUser=useSelector((store)=>store.user);
    const loggedInUserId=loggedInUser?._id;
    //const dispatch=useDispatch();

    const [messages,setmessages]=useState([]);

    const [newmessage,setnewmessage]=useState("");

    const fetchChat=async ()=>{
        const chats = await axios.post(baseURL+"chats",{id},{withCredentials:true});
        if(chats.status==200 && chats.data.data!=null) {
            console.log(chats.data.data);
            const chatMessages=chats.data.data.messages?.map((msg)=>{
                return {
                    text:msg.message,
                    firstName:msg.senderUserId.firstName,
                    fromUserId:msg.senderUserId._id,
                    date:msg.createdAt
                }
            });
            //dispatch(addChats(chatMessages));
            setmessages(chatMessages);
        }
    };

    useEffect(()=>{
        fetchChat();
    },[]);
    useEffect(()=>{
        const socket=createSocketConnection();
        if(loggedInUserId && id) {
          socket.emit("joinChat",{firstName:loggedInUser.firstName,loggedInUserId,id}); 
          socket.on("messageRecieved",({firstName,loggedInUserId,text,timestamp})=>{
            setmessages((messages)=>[...messages,{text:text,firstName:firstName,fromUserId:loggedInUserId,date:timestamp}]);
            setnewmessage("");
          });
        }
        return ()=>{
            socket.disconnect();
        }
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[loggedInUserId,id]);

    const sendMessage=()=>{
        const socket=createSocketConnection();
        socket.emit("sendMessage",{
            firstName:loggedInUser.firstName,
            loggedInUserId,
            id,
            text:newmessage
        });
    };

    return (
        <div className="flex flex-col items-center justify-center my-4">
           <h1 className="text-2xl mb-4">Chat</h1>
           <div className="flex flex-col w-full px-24">
            <div className="flex flex-col my-4 flex-1 overflow-y-auto max-h-[70vh]">
                { !messages && <p>No messages.</p> }
                {messages.map((msg,index)=>{
                    return (
                    <div className="w-full" key={index}>
                        
                        <div  className={loggedInUserId==msg.fromUserId ? "chat chat-end" : "chat chat-start"}  >
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img alt="Tailwind CSS chat bubble component"
                                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp" />
                                </div>
                            </div>
                            <div className="chat-header">
                                {msg.firstName}
                                <time className="text-xs opacity-50">{msg.date}</time>
                            </div>
                            <div className="chat-bubble">{msg.text}</div>
                            <div className="chat-footer opacity-50">Delivered</div>
                        </div>
                    </div>
                    )
                })}
            </div>
            <div className="flex">
                <input className="mr-4 border-gray-400 border-2 min-w-96 grow" value={newmessage} onChange={(e)=>setnewmessage(e.target.value)}></input>
                <button className="btn btn-primary" onClick={sendMessage} >Send</button>
            </div>
           </div>
        </div>
    )
}

export default Chat;