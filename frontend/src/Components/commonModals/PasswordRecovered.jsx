import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import emailConfirmed from "../Assets/verified.jpg";
import bg from "../Assets/logo.png";

const PasswordRecovered = () => {
  const [loading, isLoading] = useState(true);
  const { email, token } = useParams();

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/auth/${email}/verify/${token}`
        );
        console.log(response.status);
        isLoading(false);
      } catch (error) {
        isLoading(false);
        console.error("Error verifying email:", error);
      }
    };

    verifyEmail();
  }, [email, token]);

  return (
    <div>
      {loading ? (
        <loading />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
          <div className="">
            <img
              src={bg}
              alt="login dj"
              className="object-cover h-full w-full md:max-h-full md:w-auto"
            />
          </div>
          <div className="flex flex-col mt-24  md:pt-10 lg:pt-0 lg:px-20">
            <div className="text-center mb-10">
              <h1 className="text-5xl">Password Recovered Successfully</h1>
            </div>
            <div className="pt-5 ml-auto mr-auto max-w-[350px] h-auto">
              <img src={emailConfirmed} alt="" />
            </div>
            <div className="text-[#C7ADCE] text-2xl mb-5 text-center">
              Password Updated
            </div>
            <div className="text-lg mb-5 text-center">
              Your Password has been Updated
            </div>
            <Link to={"/login"}>
              <div className="flex mt-5 justify-center">
                <button
                  type="submit"
                  className="rounded-lg mt-2 mb-5 bg-[#562595] pt-1 pb-1 w-1/2 text-md font-medium uppercase text-neutral-50"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  Login
                </button>
              </div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordRecovered;
