import React from "react";
import icon from "../../../assets/images/Icon.png";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content mt-16 border-t border-secondary">
      {/* MATCH REVIEW WIDTH */}
      <div className="px-6 lg:px-16 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

        {/* Branding */}
        <div>
          <Link to="/" className="flex items-center gap-2 text-xl">
            <img src={icon} alt="" className="w-15 h-15" />
            <h2 className="text-2xl font-bold text-primary">RedPulseBD</h2>
          </Link>
          <p className="mt-2 text-sm w-1/2">
            Be the reason someone lives today—give blood, give hope. Stand with us, save lives together.
          </p>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-semibold mb-2 text-primary">Contact</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <FaPhoneAlt /> <span>+8801234567890</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope /> <span>support@red.pulse.bd.org</span>
            </li>
            <li className="flex items-center gap-2">
              <FaMapMarkerAlt /> <span>Mohammadpur, Dhaka, Bangladesh</span>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="font-semibold mb-2 text-primary">Follow Us</h3>
          <div className="flex gap-4 mt-2">
            <a href="https://www.facebook.com/" target="_blank" className="hover:text-primary transition-colors">
              <FaFacebookF />
            </a>
            <a href="https://www.instagram.com/" target="_blank" className="hover:text-primary transition-colors">
              <FaInstagram />
            </a>
            <a href="https://x.com/" target="_blank" className="hover:text-primary transition-colors">
              <FaTwitter />
            </a>
          </div>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center py-4 text-sm border-t border-secondary">
        © {currentYear} RedPulseBD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
