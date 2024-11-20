import { useState } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";
import ChatContainer from "../components/Chat/ChatContainer";
import User from "../models/user.model";
import { useSelector } from "react-redux";
import "./Root.css";

export default function Root() {
  const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);
  const [isChatVisible, setIsChatVisible] = useState(false); // État pour gérer la visibilité du chat

  const toggleChatVisibility = () => {
    setIsChatVisible((prev) => !prev); // Inverse l'état
  };

  return (
    <>
      <div id="header">
        <NavBar />
      </div>
      <div id="container">
        {currentUser && (
          <div id="chat-toggle">
            <button onClick={toggleChatVisibility}>
              {isChatVisible ? "✖️" : "💬"}
            </button>
          </div>
        )}
        {currentUser && isChatVisible && (
          <div id="chat">
            <ChatContainer />
          </div>
        )}
        <div id="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
