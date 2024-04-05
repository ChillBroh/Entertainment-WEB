import React from "react";
import bg from "../Components/Assets/logo.png";
import { Form, Input } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import emailConfirm from "../Components/Assets/emailconfirm.jpg";

const RecoverOrganizerId = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/v1/auth/recover-organizer/${values.email}`
      );
      navigate(`/organizer-recovered`);
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
          <h1 className="text-5xl">Recover Organizer ID</h1>
        </div>
        <div className="pt-5 ">
          <img src={emailConfirm} alt="" />
        </div>
        <div className="pt-5 text-lg text-center">
          Enter your Email to send Organizer ID
        </div>
        <div className="mt-5">
          <Form name="login" onFinish={onFinish} autoComplete="off">
            <h1 className="text-lg ml-2">Email</h1>
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

            <div>
              <button
                type="submit"
                className="rounded-lg mt-2 mb-5 bg-[#562595] pt-1 pb-1 w-full text-md font-medium uppercase text-neutral-50"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Recover Organizer ID
              </button>
            </div>
          </Form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default RecoverOrganizerId;