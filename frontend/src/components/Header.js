import React, { useContext, useState } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { AuthContext } from "../utils/AuthProvider";
import { Button } from "@nextui-org/react";
import { SearchIcon, MoonIcon, SunIcon, MenuIcon } from "../icons";
import { Input, WindmillContext } from "@windmill/react-ui";
import Emojicons from "../pages/Emojicons";
import { useMoralis, useMoralisQuery } from "react-moralis";

function Header() {
  const { mode, toggleMode } = useContext(WindmillContext);
  const { toggleSidebar } = useContext(SidebarContext);
  const { address, signer, connect, disconnect, web3Provider } =
    useContext(AuthContext);
  const { user } = useMoralis();
  let userprofile_ = JSON.parse(localStorage.getItem("userprofile"));
  let username;
  if (!user?.getUsername()) {
    username = "me";
  }
  const [isNotificationsMenuOpen, setIsNotificationsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  function handleNotificationsClick() {
    setIsNotificationsMenuOpen(!isNotificationsMenuOpen);
  }

  let userprofile = JSON.parse(localStorage.getItem("userprofile"));

  console.log(userprofile);
  function handleProfileClick() {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  }

  return (
    <header className="z-30 w-full py-4 bg-white shadow-bottom dark:bg-gray-800">
      <div className="container flex items-center justify-between h-full px-6 mx-auto text-blue-600 dark:text-blue-300">
        {/* <!-- Mobile hamburger --> */}
        <button
          className="p-1 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-blue"
          onClick={toggleSidebar}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        <ul className="flex items-center flex-shrink-0 space-x-16 ml-1">
          {/* <!-- Theme toggler --> */}
          <li className="flex">
            <button
              className="rounded-md focus:outline-none focus:shadow-outline-blue"
              onClick={toggleMode}
              aria-label="Toggle color mode"
            >
              {mode === "dark" ? (
                <SunIcon className="w-5 h-5" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;