import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import { Chat } from "./Chat";
const socket = io.connect("http://localhost:3001");
function App() {
   const [username, setUsername] = useState("");
   const [chat, Setchatroom] = useState("");
   const [showchat, Setshowchatroom] = useState(false);

   const joinRoom = () => {
      if (username !== "" && chat !== "") {
         socket.emit("join_room", chat);
         Setshowchatroom(true);
      }
   };
   return (
      <div className="App">
         {!showchat ? (
            <div className="joinChatContainer">
               <h3>Chatga qo'shilish</h3>
               <input
                  type="text"
                  placeholder="Abbos..."
                  onChange={(e) => setUsername(e.target.value)}
               />
               <input
                  type="text"
                  placeholder="chat room id..."
                  onChange={(e) => Setchatroom(e.target.value)}
               />
               <button onClick={joinRoom}>Chatga qo'shilish</button>
            </div>
         ) : (
            <Chat socket={socket} username={username} chat={chat} />
         )}
      </div>
   );
}

export default App;
