import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar/Navbar";

export default function Root() {
  return (
    <>
      <NavBar/>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}
