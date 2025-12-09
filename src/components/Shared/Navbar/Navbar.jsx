import React, { useState } from "react";
import logo from "../../../assets/images/Logo.png";
import { Link, NavLink } from "react-router";
import useAuth from "../../../Hooks/useAuth";


const Navbar = () => {
  const { user, logOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logOut().catch((error) => console.log(error));
  };

  const navItemClasses =
    "text-lg hover:text-primary duration-300 transition ease-in-out";

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

        {/* Mobile dropdown */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
      </div>

      {/* MIDDLE — Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          {links}
        </ul>
      </div>

      {/* RIGHT — Avatar Dropdown */}
      <div className="navbar-end relative">
        {user ? (
          <>
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border border-neutral-300 rounded-full cursor-pointer hover:shadow-md transition"
            >
              <img
                className="rounded-full w-10 h-10 object-cover"
                src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
                alt="user"
              />
            </div>

            {isOpen && (
              <div className="absolute right-0 top-14 z-50 w-48 bg-base-100 shadow-md rounded-xl overflow-hidden">
                <ul className="flex flex-col text-sm cursor-pointer">
                  <li className="px-4 py-3 font-semibold text-primary">
                    {user.displayName || "User"}
                  </li>

                  <li>
                    <Link
                      to="/dashboard"
                      className="px-4 py-3 hover:bg-neutral-100 transition font-semibold"
                    >
                      Dashboard
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={handleLogOut}
                      className="px-4 py-3 text-start hover:bg-neutral-100 transition font-semibold"
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
            <Link to="/login" className="btn btn-primary text-black">Log In</Link>
            <Link to="/signup" className="btn btn-primary text-black mx-3">Sign Up</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

