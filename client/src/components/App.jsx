import { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io.connect("http://localhost:3001");

function App() {

  const [messege, setMessege] = useState("");

  useEffect(()=> {
    socket.on("receive_messege", (data) => {
      alert(data.message);
    });
  }, [socket]);

  function sendMessage() {

    const data = {
      message: messege
    };

    socket.emit("send_messege", data)
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
    </div>
  );
}

export default App;
