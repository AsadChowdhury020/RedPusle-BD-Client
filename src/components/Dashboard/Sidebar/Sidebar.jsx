import { useState } from "react";
import { Link } from "react-router";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../assets/images/Logo.png";

// Icons
import { GrLogout } from "react-icons/gr";
import { FcSettings } from "react-icons/fc";
import { AiOutlineBars } from "react-icons/ai";

// Menus
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import VolunteerMenu from "./Menu/VolunteerMenu";
import DonorMenu from "./Menu/DonorMenu";
import useUserRole from "../../../hooks/useUserRole";
import ThemeToggle from "../../../ThemeToggle/ThemeToggle";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false);
  const { role } = useUserRole();

  const handleToggle = () => {
    setActive(!isActive);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-base-200 flex justify-between items-center md:hidden px-4">
        <Link to="/">
          <img src={logo} alt="logo" width="90" height="90" />
        </Link>

        <button
          onClick={handleToggle}
          className="p-3 rounded-lg hover:bg-base-300 transition"
        >
          <AiOutlineBars className="h-5 w-5 text-base-content" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden
        bg-base-100 border-r border-base-300 w-64 space-y-6 px-4 py-6
        absolute inset-y-0 left-0 transform
        ${isActive ? "-translate-x-full" : "translate-x-0"}
        md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="mb-6">
            <Link to="/">
              <img src={logo} alt="logo" width="100" height="100" />
            </Link>
          </div>

          {/* Menu */}
          <div className="flex-1">
            {/* <ThemeToggle></ThemeToggle> */}
            <nav className="space-y-1">
              {role === "admin" && <AdminMenu />}
              {role === "donor" && <DonorMenu />}
              {role === "volunteer" && <VolunteerMenu />}
            </nav>
          </div>

          {/* Bottom */}
          <div className="pt-4 border-t border-base-300">
            <ThemeToggle/>
            <MenuItem
              icon={FcSettings}
              label="Profile"
              address="/dashboard/profile"
            />

            <button
              onClick={logOut}
              className="flex w-full items-center px-4 py-2 mt-4
              text-base-content/70 hover:text-base-content
              hover:bg-base-200 rounded-lg transition"
            >
              <GrLogout className="w-5 h-5" />
              <span className="ml-4 font-medium">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
