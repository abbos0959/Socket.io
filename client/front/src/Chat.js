import React, { useState, useEffect } from "react";

export const Chat = ({ socket, username, chat }) => {
   const [currentMessage, setCurrentMEssage] = useState("");
   const [messageList, setmessagelist] = useState([]);

   const SendMessage = async () => {
      if (currentMessage !== "") {
         const messageData = {
            chat: chat,
            author: username,
            message: currentMessage,
            time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
         };
         await socket.emit("send_message", messageData);
         setmessagelist((list) => [...list, messageData]);
      }
      setCurrentMEssage("");
   };

   useEffect(() => {
      socket.on("receive_message", (data) => {
         console.log(data);
         setmessagelist((list) => [...list, data]);
      });
   }, [socket]);
   return (
      <div className="chat-window">
         <div className="chat-header">
            <p>Liva Chat</p>
         </div>
         <div className="chat-body">
            {messageList.map((val) => {
               return (
                  <div className="message" id={username == val.author ? "you" : "other"}>
                     <div>
                        <div className="message-content">
                           <p>{val.message}</p>
                        </div>
                        <div className="message-meta">
                           <p id="time">{val.time}</p>
                           <p id="author">{val.author}</p>
                        </div>
                     </div>
                  </div>
               );
            })}
         </div>
         <div className="chat-footer">
            <input
               type="text"
               value={currentMessage}
               placeholder="SMS yozish..."
               onChange={(e) => setCurrentMEssage(e.target.value)}
               onKeyDown={(e) => e.key === "Enter" && SendMessage()}
            />
            <button onClick={SendMessage} style={{ cursor: "pointer" }}>
               &#9658;
            </button>
         </div>
      </div>
   );
};
