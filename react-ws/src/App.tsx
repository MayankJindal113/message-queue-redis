import { useState, useEffect } from "react";
import "./App.css";

function useSocket() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [latestMessage, setLatestMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    socket.onopen = () => {
      console.log("Connected");
      setSocket(socket);
    };
    socket.onmessage = (message) => {
      console.log("Received message", message.data);
      setLatestMessage(message.data);
    };

    return () => {
      socket.close();
    };
  }, []);
  return { socket, latestMessage };
}

function App() {
  const { socket, latestMessage } = useSocket();
  const [inputValue, setInputValue] = useState<string>("");

  if (!socket) {
    return <div>Connecting to the socket server .... </div>;
  }

  return (
    <>
      {/* 
        Logic: 
        - Create a piece of state called inputValue to store the current value of the input field.
        - Update this value on every change in the input field using the onChange handler.
        - When the "Send" button is clicked, send the value of inputValue through the WebSocket connection.
      */}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message here"
      />
      <button
        onClick={() => {
          if (inputValue.trim() !== "") {
            socket.send(inputValue);
            console.log("Sent:", inputValue);
            setInputValue(""); // Optionally clear input after send
          }
        }}
      >
        Send
      </button>
      {latestMessage}
    </>
  );
}

export default App;
