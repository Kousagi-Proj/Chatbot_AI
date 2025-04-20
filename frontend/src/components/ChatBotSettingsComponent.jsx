import React from "react";
import "../styles/cb-settings.css";
export default function ChatBotSettingsComponent() {
  return (
    <div className="cb-settings-container">
      <div className="cbs-header">
        <div className="cbs-left">
          <h1>Chatbots 💬</h1>
          <p>Create and manage your chats.</p>
        </div>
        <button className="cbs-header-btn">+ Create new Chatbot</button>
      </div>
      <div className="cbs-body">
        <div className="cbs-sidebar">
          <ul>
            <li style={{ fontWeight: 600 }}>Chatbot</li>
            <li>Knowledge</li>
            <li>Corrections</li>
            <li>Behavior</li>
            <li>Settings</li>
            <li>Install</li>
          </ul>
        </div>
        <div className="cbs-content">
          <div style={{ fontWeight: 600 }}>
            <p>Logo</p>
            <div className="sidebar-logo-group" style={{ paddingLeft: "1vw" }}>
              <div className="sb-logo-box"></div>
            </div>
          </div>
          <div className="cbs-pbody">
            <p>Headline</p>
            <p>Chat with our AI</p>
          </div>
          <div className="cbs-pbody">
            <p>Description</p>
            <p>Ask any question and out AI will answer!</p>
          </div>
          <div className="cbs-pbody">
            <p>Welcome message</p>
            <p style={{ lineHeight: "2.5vw" }}>
              Hi there👋<br></br>I'm the AI Assistant<br></br>How can I help you
              today?
            </p>
          </div>
          <div className="cbs-pbody">
            <p>Headline</p>
            <p>Chat with our AI</p>
          </div>
          <div>
            <p style={{ fontWeight: 600 }}>Update Context</p>
            <input style={{ marginLeft: "1vw" }}></input>
          </div>
          <div>
            <p style={{ fontWeight: 600 }}>Update FAQ</p>
            <div style={{ marginLeft: "1vw" }}>
              <input></input>
            </div>
          </div>
        </div>
        <div className="cbs-chatbox">
          <div className="cbs-chatbox-out">
            <div className="cbs-chatbox-top">
              <h4>Chat with our AI</h4>
              <p>Ask any question and out AI will answer!</p>
              <button>New chat</button>
            </div>

            <div className="cbs-chatbox-box">
              <div className="cbs-chatbox-input">
                <input placeholder="Type your message here"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
