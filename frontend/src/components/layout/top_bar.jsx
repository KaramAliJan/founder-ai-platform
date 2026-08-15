import React, { useState } from "react";
import "./layout.css"

function Top_bar() {
    return (
        <div className="side-bar" >
            <nav className="navbar">
                <h1 >
                    <span style={{ color: "#F9FAFB" }}>founder</span>
                    <span style={{ color: "#7C6EFF" }}>OS</span>
                </h1>
                <ul>
                    <li>Dashboard</li>
                    <li>Chat</li>
                    <li>Tasks</li>
                    <li>Timeline</li>
                    <li>Reports</li>

                </ul>
                <h4 style={{ color: "#4B5563" }}>Integerations</h4>
            </nav>
            <nav className="navbar">
                <ul>
                    <li>Github</li>
                    <li>Notion</li>
                    <li>Calendar</li>
                </ul>
            </nav>
            <h4 style={{ color: "#4B5563", marginLeft: "32px" }}>Account</h4>
            <nav className="navbar">
                <ul>
                    <li>Settings</li>
                </ul>
            </nav>

        </div>
    );
}
export default Top_bar;