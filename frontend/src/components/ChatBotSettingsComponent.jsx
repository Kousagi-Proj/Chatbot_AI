import React, { useState, useEffect, useRef } from "react";
import "../styles/style.css";

export default function ChatBotSettingsComponent() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [context, setContext] = useState("");
  const [faqQ, setFaqQ] = useState("");
  const [faqA, setFaqA] = useState("");
  const socket = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8000/ws");
    socket.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { type: "bot", text: event.data }]);
    };
    return () => socket.current.close();
  }, []);

  const sendMessage = () => {
    if (!input) return;
    socket.current.send(input);
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");
  };

  const updateContext = async () => {
    await fetch("http://localhost:8000/update-context", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ context }),
    });
  };

  const updateFAQ = async () => {
    await fetch("http://localhost:8000/update-faq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: faqQ, answer: faqA }),
    });
  };

  return (
    <div className="chat">
      <div className="chat-window">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.type}`}>
            <strong>{msg.type === "user" ? "User" : "ProdAI"}:</strong>{" "}
            {msg.text}
          </div>
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>

      <h3>Update Context</h3>
      <textarea value={context} onChange={(e) => setContext(e.target.value)} />
      <button onClick={updateContext}>Update Context</button>

      <h3>Update FAQ</h3>
      <input
        value={faqQ}
        onChange={(e) => setFaqQ(e.target.value)}
        placeholder="FAQ Question"
      />
      <input
        value={faqA}
        onChange={(e) => setFaqA(e.target.value)}
        placeholder="FAQ Answer"
      />
      <button onClick={updateFAQ}>Update FAQ</button>
    </div>
  );
}
