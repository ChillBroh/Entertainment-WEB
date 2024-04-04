import React from "react";
import logo from "../Components/Assets/logoHeader.png";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const HeaderAuthenticate = () => {
  return (
    <div>
      <nav
        class="relative flex w-full items-center justify-between bg-[#562595] shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div class="flex w-full flex-wrap items-center  px-3">
          <div>
            <img src={logo} alt="" className="max-h-[30px] ml-5" />
          </div>
          <div className="text-white ml-16">
            <ul className="list-none flex">
              <li className="mx-4">Home</li>
              <li className="mx-4">My List</li>
              <li className="mx-4">Chats</li>
              <li className="mx-4">About</li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderAuthenticate;
