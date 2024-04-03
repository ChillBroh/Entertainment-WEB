import React from "react";
import bg from "../Components/Assets/organizer.jpg";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const LoginFormOrganizer = () => {
  const navigate = useNavigate;
  const onFinish = async (values) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email: values.email,
        password: values.password,
        orgId: values.id,
      });
      console.log(res.data);

      // if (res.data.isAdmin === true) {
      //   navigate("/admin");
      // }
      // if (res.data.isAdmin === false) {
      //   navigate("/");
      // }
    } catch (err) {
      const res = err.response.status === 401 || 15;
      if (res) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid Email or Password",
        });
      }
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="flex flex-col mt-24 px-12 md:pt-10 lg:pt-0 lg:px-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl">Login </h1>
          <h1 className="text-2xl">as an </h1>
          <h1 className="text-5xl">Organizer </h1>
        </div>
        <div className="">
          <Form name="login" onFinish={onFinish} autoComplete="off">
            <h1 className="text-md mb-2">Email</h1>
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="email"
                className="w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </Form.Item>

            <h1 className="text-md mb-2">Organizer ID</h1>
            <Form.Item
              name="id"
              rules={[
                {
                  required: true,
                  message: "Please input your Id",
                },
                {
                  type: "number",
                  message: "The input is not a valid Id!!",
                },
              ]}
              hasFeedback
            >
              <Input
                placeholder="Organizer Id"
                className="w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </Form.Item>
            <h1 className="text-md mb-2">Password</h1>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password
                placeholder="Password"
                className="w-full rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              />
            </Form.Item>
            <Link
              to={"/reset-password"}
              className="text-[#991AAD] hover:text-[#C7ADCE]"
            >
              Forgot Password
            </Link>
            <div>
              <button
                type="submit"
                className="rounded-lg mt-16 bg-[#562595] pt-1 pb-1 w-full text-md font-medium uppercase text-neutral-50"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Log in
              </button>
              <Link
                to={"/signup-organizer"}
                className="text-[#991AAD] hover:text-[#C7ADCE]"
              >
                <h1 className=" text-center mt-2 ">
                  Don't Have an account? Sign Up
                </h1>
              </Link>
            </div>
          </Form>
        </div>
        <div></div>
      </div>
      <div className="md:flex md:justify-end">
        <img
          src={bg}
          alt="login dj"
          className="object-cover h-full w-full md:max-h-full md:w-auto"
        />
      </div>
    </div>
  );
};

export default LoginFormOrganizer;
