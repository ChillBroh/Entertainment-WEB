import React from "react";
import logo from "../Components/Assets/logoHeader.png";
import {
  FacebookFilled,
  TwitterSquareFilled,
  InstagramFilled,
  YoutubeFilled,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const HeaderHome = () => {
  return (
    <div>
      <nav
        className="relative flex w-full items-center justify-between bg-[#562595] shadow-dark-mild dark:bg-body-dark lg:flex-wrap lg:justify-start lg:py-4"
        data-twe-navbar-ref
      >
        <div className="flex w-full flex-wrap items-center justify-between  px-3">
          <div>
            <Link to={"/"}>
              <img src={logo} alt="" className="max-h-[70px] ml-5" />
            </Link>
          </div>
          <div className="bg-white flex justify-evenly w-1/4">
            <FacebookFilled className="text-[#562595] text-5xl p-2" />
            <InstagramFilled className="text-[#562595] text-5xl p-2" />
            <TwitterSquareFilled className="text-[#562595] text-5xl p-2" />
            <YoutubeFilled className="text-[#562595] text-5xl p-2" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default HeaderHome;
