import { useEffect, useState } from "react";
import io from "socket.io-client";
import SingleMessage from "./SingleMessage";
import "./App.css";

const socket = io.connect("http://localhost:3001");

function App() {

  const [room, setRoom] = useState(null);
  const [message, setmessage] = useState("");
  const [receivedMsg, setReceivedMsg] = useState([]);

  useEffect(()=> {
    socket.on("receive_message", (data) => {
      setReceivedMsg((prev) => [...prev, data.message]);
    });
  }, [socket]);

  function sendMessage() {

    const data = {
      room: room,
      message: message
    };

    if(data.room !== null) {
      socket.emit("send_message", data)
      setmessage("");
    }
  }

  function joinRoom(e) {
    const roomInput = document.getElementById("room-input").value;
    setRoom(roomInput);
    socket.emit("join_room", {room: roomInput});
  }

  return (
    <div className="App">
      {room === null ?
        <div>
          <input id="room-input" placeholder="Join Room" />
          <button onClick={joinRoom}>Join</button>
        </div>
      :
      <button onClick={()=> setRoom(null)}>Exit Room</button>
      }
      <input
        value={message}
        onChange={(e) => {
          setmessage(e.target.value)
        }}
        placeholder="Message..." />
      <button onClick={sendMessage}>Send</button>
      <br />
      {receivedMsg.map((msg) => (
        <SingleMessage message={msg} />
      ))}
    </div>
  );
}

export default App;
