import React, { useState } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "../components/SideBar";

function MainPage() {
  const [chatBots, setChatBots] = useState([]);

  const getRandomColor = () =>
    "#" +
    Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0");

  const addNewBot = () => {
    const newBot = {
      name: `Chat bot ${chatBots.length + 1}`,
      description: "Describe your chat bot here...",
      tag: "Add bot type...",
      color: getRandomColor(),
      headline: "Chat with our AI",
      boxDescription: "Ask any question and out AI will answer!",
      welcome: `Hi there👋\nI'm the AI Assistant\nHow can I help you today?`,
      context: "",
    };
    setChatBots((prev) => [...prev, newBot]);
    return newBot;
  };

  return (
    <div className="main-layout">
      <SideBar chatBots={chatBots} />
      <div className="outlet-container">
        <Outlet context={{ chatBots, setChatBots, addNewBot }} />
      </div>
    </div>
  );
}

export default MainPage;
