import React from "react";
import bg from "../Assets/logo.png";
import { Form, Input } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import enterOTP from "../Assets/enterOTP.jpg";

const OTPVerification = () => {
  const navigate = useNavigate();
  const params = useParams();
  const onFinish = async (values) => {
    try {
      const email = params.email;
      const otp = values.code;
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/reset-pass/otp`,
        {
          email,
          otp,
        }
      );
      navigate(`/reset-password/${email}`);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response.data.message,
      });
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="">
        <img
          src={bg}
          alt="login dj"
          className="object-cover h-full w-full md:max-h-full md:w-auto"
        />
      </div>
      <div className="flex flex-col mt-24 px-12 md:pt-10 lg:pt-0 lg:px-20">
        <div className="text-center mb-2">
          <h1 className="text-5xl">OTP Verification</h1>
        </div>
        <div className="pt-5 ">
          <img src={enterOTP} alt="" />
        </div>
        <div className="pt-5 text-lg text-center">
          We want to make sure it's really you. In order to verify, your Email,
          enter the verification code that was sent to{" "}
          <span className="text-[#562595]">{params.email}</span>
        </div>
        <div className="mt-5 px-16">
          <Form name="login" onFinish={onFinish} autoComplete="off">
            <h1 className="text-lg ml-2">Verfication Code</h1>
            <Form.Item
              name="code"
              rules={[
                {
                  required: true,
                  message: "Please input code!",
                },
                {
                  type: "Number",
                  message: "The input is not valid!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Verification Code"
                className="w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </Form.Item>

            <div>
              <button
                type="submit"
                className="rounded-lg mt-2 mb-5 bg-[#562595] pt-1 pb-1 w-full text-md font-medium uppercase text-neutral-50"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Verify
              </button>
            </div>
          </Form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default OTPVerification;