import { useEffect } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {

  useEffect(()=> {
    const socket = io.connect("http://localhost:3001");
  }, []);

  function sendMessage() {

  }

  return (
    <div className="App">
      <input placeholder="Message..."/>
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
