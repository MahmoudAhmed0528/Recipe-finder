import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faUtensils,
  faInfo,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const isAuthenticated = Auth.loggedIn();

  return (
    <header className="bg-violet-950 text-white py-4 px-8 h-full w-full">
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          <Link to="/">Recipe Finder</Link>
        </h1>
        <nav>
          {isAuthenticated ? (
            <ul className="flex flex-col space-y-4 ">
              <li>
                <Link to="/aboutUs" className="flex items-center">
                  <FontAwesomeIcon icon={faInfo} className="mr-1" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="flex items-center">
                  <FontAwesomeIcon icon={faHome} className="mr-1" />
                  Home
                </Link>
              </li>
              <li>
                <Link to="/myRecipes" className="flex items-center">
                  <FontAwesomeIcon icon={faUtensils} className="mr-1" />
                  My Recipes
                </Link>
              </li>
              <li>
                <button
                  className="flex items-center hover:underline"
                  onClick={() => Auth.logout()}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-1" />
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="flex flex-col space-y-4">
              <li>
                <Link to="/aboutUs" className="flex items-center">
                  <FontAwesomeIcon icon={faInfo} className="mr-1" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/signup" className="flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-1" />
                  Signup
                </Link>
              </li>
              <li>
                <Link to="/login" className="flex items-center">
                  <FontAwesomeIcon icon={faUser} className="mr-1" />
                  Login
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
