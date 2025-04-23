import React, { useState, useEffect, useRef } from "react";
import "../../styles/chatbox.css";
import "../../styles/cb-settings.css";
import { FaArrowRight } from "react-icons/fa";

export default function ChatBox({ settings }) {
  const { color, welcome, headline, boxDescription } = settings;
  const [messages, setMessages] = useState([{ type: "bot", text: welcome }]);
  const [input, setInput] = useState("");
  //   const [context, setContext] = useState("");
  //   const [faqQ, setFaqQ] = useState("");
  //   const [faqA, setFaqA] = useState("");
  const socket = useRef(null);
  const chatRef = useRef(null);

  useEffect(() => {
    socket.current = new WebSocket("ws://localhost:8000/ws");
    socket.current.onmessage = (event) => {
      setMessages((prev) => [...prev, { type: "bot", text: event.data }]);
    };
    return () => socket.current.close();
  }, []);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length > 0 && prev[0].type === "bot") {
        const updated = [...prev];
        updated[0] = { ...updated[0], text: welcome };
        return updated;
      }
      return prev;
    });
  }, [welcome]);

  const sendMessage = () => {
    if (!input) return;
    socket.current.send(input);
    setMessages((prev) => [...prev, { type: "user", text: input }]);
    setInput("");
  };

  const startNewChat = () => {
    setMessages([{ type: "bot", text: welcome }]);
    setInput("");
  };

  function darkenColor(hex, percent = 20) {
    const num = parseInt(hex.replace("#", ""), 16);
    let r = (num >> 16) - percent;
    let g = ((num >> 8) & 0x00ff) - percent;
    let b = (num & 0x0000ff) - percent;

    r = r < 0 ? 0 : r;
    g = g < 0 ? 0 : g;
    b = b < 0 ? 0 : b;

    const newColor = `#${((r << 16) | (g << 8) | b)
      .toString(16)
      .padStart(6, "0")}`;
    return newColor;
  }

  // const updateContext = async () => {
  //   await fetch("http://localhost:8000/update-context", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ context }),
  //   });
  // };

  //   const updateFAQ = async () => {
  //     await fetch("http://localhost:8000/update-faq", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ question: faqQ, answer: faqA }),
  //     });
  //   };

  return (
    <div className="cbs-chatbox">
      <div className="cbs-chatbox-out" style={{ backgroundColor: color }}>
        <div className="cbs-chatbox-top">
          <h4>{headline}</h4>
          <p>{boxDescription}</p>
          <button
            onClick={startNewChat}
            style={{ backgroundColor: darkenColor(color) }}
          >
            New chat
          </button>
        </div>
        <div className="cbs-chatbox-box">
          <div
            className="chat-window"
            ref={chatRef}
            style={{ overflowY: "auto" }}
          >
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                <strong>{msg.type === "user" ? "You" : "ProdAI"}:</strong>{" "}
                {msg.text}
              </div>
            ))}
          </div>
          <div className="cbs-chatbox-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here"
            ></input>{" "}
            <FaArrowRight onClick={sendMessage} className="cbs-chatbox-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* <div className="chat">
     <div className="chat-window">
    {messages.map((msg, index) => (
      <div key={index} className={`message ${msg.type}`}>
        <strong>{msg.type === "user" ? "User" : "ProdAI"}:</strong> {msg.text}
      </div>
    ))}
  </div>
        <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" />
        <button onClick={sendMessage}>Send</button>
  
        <h3>Update Context</h3>
        <textarea value={context} onChange={e => setContext(e.target.value)} />
        <button onClick={updateContext}>Update Context</button>
  
        <h3>Update FAQ</h3>
        <input value={faqQ} onChange={e => setFaqQ(e.target.value)} placeholder="FAQ Question" />
        <input value={faqA} onChange={e => setFaqA(e.target.value)} placeholder="FAQ Answer" />
        <button onClick={updateFAQ}>Update FAQ</button>
      </div> */
}
