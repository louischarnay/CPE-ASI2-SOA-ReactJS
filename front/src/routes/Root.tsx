import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";
import ChatContainer from "../components/Chat/ChatContainer";
import User from "../models/user.model";
import { useSelector } from "react-redux";
import "./Root.css"

export default function Root() {
  const currentUser: User = useSelector((state: any) => state.userReducer.currentUser);

  return (
    <>
      <div id="header">
        <NavBar />
      </div>
      <div id="container">
        {
          currentUser &&
          <div id="chat">
            <ChatContainer />
          </div>
        }
        <div id="content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
