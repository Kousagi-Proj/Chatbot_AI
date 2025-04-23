import React from "react";
import ChatBox from "./chatbot-settings/chatbox";
import { useParams, useOutletContext, useNavigate } from "react-router-dom";

export default function ChatBotSettingsComponent() {
  const navigate = useNavigate();
  const { botId } = useParams();
  const { chatBots, setChatBots, addNewBot } = useOutletContext();
  const botIndex = chatBots.findIndex(
    (b) => b.name.replace(/\s+/g, "-").toLowerCase() === botId
  );
  const bot = chatBots.find(
    (b) => b.name.replace(/\s+/g, "-").toLowerCase() === botId
  );

  if (!bot) return <p>Bot not found.</p>;

  const handleChange = (field, value) => {
    const updatedBots = [...chatBots];
    updatedBots[botIndex] = {
      ...updatedBots[botIndex],
      [field]: value,
    };
    setChatBots(updatedBots);
  };

  const handleAddNewBot = () => {
    const newBot = addNewBot();
    const formattedName = newBot.name.replace(/\s+/g, "-").toLowerCase();
    navigate(`/chatbot/${formattedName}`);
  };

  return (
    <div className="cb-settings-container">
      <div className="cbs-header">
        <div className="cbs-left">
          <h1>Chatbots 💬</h1>
          <p>Create and manage your chats.</p>
        </div>
        <button className="cbs-header-btn" onClick={handleAddNewBot}>
          + Create new Chatbot
        </button>
      </div>
      <div className="cbs-body">
        <div className="cbs-sidebar">
          <ul>
            <li style={{ fontWeight: 600 }} className="cbs-active">
              Chatbot
            </li>
            <li>Knowledge</li>
            <li>Corrections</li>
            <li>Behavior</li>
            <li>Settings</li>
            <li>Install</li>
          </ul>
        </div>
        <div className="cbs-content">
          {/* <div style={{ fontWeight: 600 }}>
            <p>Logo</p>
            <div className="sidebar-logo-group" style={{ paddingLeft: "1vw" }}>
              <div className="sb-logo-box"></div>
            </div>
          </div> */}
          <div className="cbs-pbody">
            <p>Headline</p>
            <input
              value={bot.headline}
              onChange={(e) => handleChange("headline", e.target.value)}
            ></input>
          </div>
          <div className="cbs-pbody">
            <p>Description</p>
            <input
              value={bot.boxDescription}
              onChange={(e) => handleChange("boxDescription", e.target.value)}
            ></input>
          </div>
          <div className="cbs-pbody">
            <p>Welcome message</p>
            <textarea
              value={bot.welcome}
              onChange={(e) => handleChange("welcome", e.target.value)}
              style={{ lineHeight: "1.5vw" }}
            ></textarea>
          </div>

          <div>
            <p style={{ fontWeight: 600 }}>Update Context</p>
            <div className="cbs-ta">
              <textarea
                value={bot.context}
                onChange={(e) => handleChange("context", e.target.value)}
              ></textarea>{" "}
              <button>Save</button>
            </div>
          </div>
          {/* <div>
            <p style={{ fontWeight: 600 }}>Update FAQ</p>
            <div style={{ marginLeft: "1vw" }}>
              <input></input>
            </div>
          </div> */}
        </div>
        {/* <div className="cbs-chatbox">
          <div className="cbs-chatbox-out">
            <div className="cbs-chatbox-top">
              <h4>Chat with our AI</h4>
              <p>Ask any question and out AI will answer!</p>
              <button>New chat</button>
            </div>

            <div className="cbs-chatbox-box">
              <div className="cbs-chatbox-input">
                <input placeholder="Type your message here"></input>{" "}
                <FaArrowRight className="cbs-chatbox-icon" />
              </div>
            </div>
          </div>
        </div> */}
        <ChatBox settings={bot} />
      </div>
    </div>
  );
}
