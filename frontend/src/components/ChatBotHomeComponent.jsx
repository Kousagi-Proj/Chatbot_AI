import React from "react";
import "../styles/cb-home.css";
import { useOutletContext, useNavigate } from "react-router-dom";

export default function ChatBotHomeComponent() {
  const navigate = useNavigate();
  const { chatBots, setChatBots, addNewBot } = useOutletContext();

  const handleChange = (index, field, value) => {
    const updatedBots = [...chatBots];
    updatedBots[index] = {
      ...updatedBots[index],
      [field]: value,
    };
    setChatBots(updatedBots);
  };

  return (
    <div className="cb-settings-container">
      <div className="cbs-header">
        <div className="cbs-left">
          <h1>Chatbots 💬</h1>
          <p>Create and manage your chats.</p>
        </div>
      </div>
      <div className="cbh-body">
        {chatBots.map((bot, index) => (
          <div
            key={index}
            className="cbh-box"
            style={{ backgroundColor: bot.color }}
          >
            <div className="cbh-box-content">
              <div className="cbh-top">
                <div className="cbh-logo">
                  <div className="line-group">
                    <div
                      className="cbh-logo-line"
                      style={{ height: "1vw" }}
                    ></div>
                    <div
                      className="cbh-logo-line"
                      style={{ height: "2vw" }}
                    ></div>
                    <div
                      className="cbh-logo-line"
                      style={{ height: "1.5vw" }}
                    ></div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      `/chatbot/${bot.name.replace(/\s+/g, "-").toLowerCase()}`
                    )
                  }
                >
                  Edit
                </button>
              </div>
              <div className="cbh-bottom">
                <div className="cbh-tag-group">
                  <input
                    value={bot.name}
                    onChange={(e) =>
                      handleChange(index, "name", e.target.value)
                    }
                  ></input>
                  <input
                    value={bot.tag}
                    onChange={(e) => handleChange(index, "tag", e.target.value)}
                  ></input>
                </div>
                <input
                  value={bot.description}
                  onChange={(e) =>
                    handleChange(index, "description", e.target.value)
                  }
                ></input>
              </div>
            </div>
          </div>
        ))}
        <button className="cbh-add-box" onClick={addNewBot}>
          + Create new bot
        </button>
      </div>
    </div>
  );
}
