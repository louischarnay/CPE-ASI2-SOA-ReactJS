import { Outlet } from "react-router-dom";
import NavBar from "../components/Navbar";

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
