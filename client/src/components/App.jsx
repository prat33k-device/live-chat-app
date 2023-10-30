import { useEffect, useState } from "react";
import io from "socket.io-client";
import SingleMessage from "./SingleMessage";
import "./App.css";

const socket = io.connect("http://localhost:3001");

function App() {

  const [messege, setMessege] = useState("");
  const [receivedMsg, setReceivedMsg] = useState([]);

  useEffect(()=> {
    socket.on("receive_messege", (data) => {
      setReceivedMsg((prev) => [...prev, data.message]);
    });
  }, [socket]);

  function sendMessage() {

    const data = {
      message: messege
    };

    socket.emit("send_messege", data)
    setMessege("");
  }

  return (
    <div className="App">
      <input
        value={messege}
        onChange={(e) => {
          setMessege(e.target.value)
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
