import React from "react";
import {
  RiHomeLine,
  RiSettings3Line,
  RiCheckboxBlankFill,
} from "react-icons/ri";

export default function SideBar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-logo-group">
        <a href="#">
          <div className="sb-logo-box"></div>
          <h1>ProdAI</h1>
        </a>
      </div>
      <div className="menu-group">
        <div className="sb-main-group">
          <h4>Main menu</h4>
          <ul>
            <a href="/home">
              <li>
                <RiHomeLine />
                Home
              </li>
            </a>
            <a href="/settings">
              <li>
                <RiSettings3Line />
                Settings
              </li>
            </a>
          </ul>
        </div>
        <div className="sb-chat-group">
          <h4>Chat bots</h4>
          <ul>
            <li>
              <RiCheckboxBlankFill />
              Sample Bot
            </li>
            <li>
              <RiCheckboxBlankFill />
              Sample Bot
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
