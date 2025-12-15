import React, { useState } from "react";
import logo from "../../../assets/images/Logo.png";
import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useUserRole from "../../../hooks/useUserRole";
import ThemeToggle from "../../../ThemeToggle/ThemeToggle";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const { role } = useUserRole();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  console.log(role)
  const navItemClasses =
  "text-lg text-base-content hover:text-primary transition duration-300";


  const links = (
    <>
      <li><NavLink className={navItemClasses} to="/">Home</NavLink></li>
      <li><NavLink className={navItemClasses} to="/donation-requests">Donation Requests</NavLink></li>
      <li><NavLink className={navItemClasses} to="/funding">Funding</NavLink></li>
      <li><NavLink className={navItemClasses} to="/search">Search</NavLink></li>
      <li><NavLink className={navItemClasses} to="/blogs">Blogs</NavLink></li>
      <li><NavLink className={navItemClasses} to="/reviews">Reviews</NavLink></li>
      <li><NavLink className={navItemClasses} to="/about-us">About Us</NavLink></li>
    </>
  );

  return (
    <div className="navbar fixed top-0 left-0 w-full bg-base-200 z-50 shadow-sm px-4 lg:px-10 py-3">
      
      {/* LEFT — Logo */}
      <div className="navbar-start">
        <Link to="/">
          <img src={logo} alt="logo" width="100" height="100" />
        </Link>

        {/* Mobile menu */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost text-base-content">
            ☰
          </div>

          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>
      </div>

      {/* CENTER — Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-4">{links}</ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3 relative">
        <ThemeToggle />

        {user ? (
          <>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="p-1 border border-base-300 rounded-full cursor-pointer hover:shadow transition"
            >
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                alt="user"
              />
            </div>

            {isOpen && (
              <div className="absolute right-0 top-14 z-50 w-48 bg-base-100 shadow-lg rounded-xl overflow-hidden">
                <ul className="flex flex-col text-sm">
                  <li className="px-4 py-3 font-semibold text-primary">
                    {user.displayName || "User"}
                  </li>

                  <li>
                    <Link
                      to={`/dashboard/${role}`}
                      className="px-4 py-3 hover:bg-base-200 transition font-semibold"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogOut}
                      className="px-4 py-3 text-start hover:bg-base-200 transition font-semibold"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-primary">
              Log In
            </Link>
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
