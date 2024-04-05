import React from "react";
import bg from "../Components/Assets/logo.png";
import { Form, Input } from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import resetPassword from "../Components/Assets/resetPassword.jpg";

const PasswordResetForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const onFinish = async (values) => {
    try {
      const email = params.email;
      const password = values.password;
      const res = await axios.post(
        `http://localhost:5000/api/v1/auth/reset-pass`,
        {
          password,
          email,
        }
      );
      navigate(`/password-recoverd`);
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
          <h1 className="text-5xl">Reset Password</h1>
        </div>
        <div className="pt-5 max-h-[400px] flex justify-center">
          <img src={resetPassword} alt="" className="max-h-[350px]" />
        </div>
        <div className="pt-5 text-lg text-center">Create New Password</div>
        <div className="mt-5 px-16">
          <Form name="login" onFinish={onFinish} autoComplete="off">
            <div className="flex flex-col justify-evenly">
              <div className="min-w-[250px] ">
                <h1 className="text-lg mb-2 ml-2">Password</h1>
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
                  <Input.Password placeholder="Password" />
                </Form.Item>
              </div>
              <div className="min-w-[250px] ">
                <h1 className="text-lg mb-2 ml-2">Confirm Password</h1>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "Please confirm your password!",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error("Passwords do not match!")
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm Password" />
                </Form.Item>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="rounded-lg mt-2 mb-5 bg-[#562595] pt-1 pb-1 w-full text-md font-medium uppercase text-neutral-50"
                data-twe-ripple-init
                data-twe-ripple-color="light"
              >
                Reset Password
              </button>
            </div>
          </Form>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default PasswordResetForm;
