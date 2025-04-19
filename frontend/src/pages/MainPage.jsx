import React from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import SideBar from "../components/SideBar";

function MainPage() {
  return (
    <div className="main-layout">
    <SideBar/>
    <div className='outlet-container'>
        <Outlet></Outlet>
    </div>
    </div>
  )
}

export default MainPage