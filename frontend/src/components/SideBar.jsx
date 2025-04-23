import React from "react";
import {
  RiHomeLine,
  RiSettings3Line,
  RiCheckboxBlankFill,
} from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";

export default function SideBar({ chatBots }) {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div className="sidebar-container">
      <div className="sidebar-logo-group">
        <a href="#">
          <div className="sb-logo-box">
            <div
              className="line-group"
              style={{ padding: "2vw .3vw !important" }}
            >
              <div className="cbh-logo-line" style={{ height: "1.3vw" }}></div>
              <div className="cbh-logo-line" style={{ height: "2.3vw" }}></div>
              <div className="cbh-logo-line" style={{ height: "1.8vw" }}></div>
            </div>
          </div>
          <h1>ProdAI</h1>
        </a>
      </div>
      <div className="menu-group">
        <div className="sb-main-group">
          <h4>Main menu</h4>

          <Link to="/home">
            <li className={path === "/home" ? "active-sidebar" : ""}>
              <RiHomeLine />
              Home
            </li>
          </Link>
          <Link to="/settings">
            <li className={path === "/settings" ? "active-sidebar" : ""}>
              <RiSettings3Line />
              Settings
            </li>
          </Link>
        </div>
        <div className="sb-chat-group">
          <h4>Chat bots</h4>
          <div className="sb-chat-content">
            {chatBots.map((bot, i) => (
              <Link
                key={i}
                to={`/chatbot/${bot.name.replace(/\s+/g, "-").toLowerCase()}`}
              >
                <li
                  className={
                    path.includes(bot.name.replace(/\s+/g, "-").toLowerCase())
                      ? "active-sidebar"
                      : ""
                  }
                >
                  <RiCheckboxBlankFill style={{ color: bot.color }} />
                  {bot.name}
                </li>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
