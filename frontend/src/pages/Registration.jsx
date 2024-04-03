import { useState } from "react";
import React from "react";
import bg from "../Components/Assets/dj-playing-and-mixing-music-in-nightclub-party-at-night-edm-dance-music-club-with-crowd-of-young-people-free-photo.jpg";
import { Form, Input } from "antd";
import Swal from "sweetalert2";

const Registration = () => {
  const [file, setFile] = useState("");
  const [form] = Form.useForm();
  const onFinish = (values) => {
    const name = values.name.trim();
    const email = values.email.trim();
    const nic = values.nic.trim();
    const phone = values.phone.trim();
    const pass = values.password.trim();
    if (
      name === "" ||
      email === "" ||
      nic === "" ||
      phone === "" ||
      pass === "" ||
      file === undefined
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All Fields Required!",
      });
      return;
    }
    console.log("Success:", values);
    console.log(file);
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      {/* Image */}
      <div className="md:flex md:justify-end">
        <img
          src={bg}
          alt="dj"
          className="object-cover h-full w-full md:max-h-full md:w-auto"
        />
      </div>

      {/* Form */}
      <div className="flex flex-col mt-24 px-2 md:pt-10 lg:pt-0 ">
        <div className="text-3xl text-center">Create New Profile</div>
        <div className="mt-6 flex sm:flex-row justify-center">
          <label htmlFor="fileInput">
            <img
              className="rounded-full"
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="avatar"
              style={{ width: "120px", height: "120px", cursor: "pointer" }}
            />
          </label>
          <input
            type="file"
            id="fileInput"
            name="file"
            style={{ display: "none" }}
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              setFile(file);
            }}
            required
          />
        </div>
        <Form
          form={form}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          autoComplete="off"
          className="mt-10"
        >
          <div className="grid grid-rows-3">
            <div className="flex flex-row justify-evenly">
              <div className="min-w-[250px]">
                <h1 className="text-lg mb-2 ml-2">Full Name</h1>
                <Form.Item
                  name={"name"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Full Name" />
                </Form.Item>
              </div>

              <div className="min-w-[250px]">
                <h1 className="text-lg mb-2 ml-2">Email Address</h1>
                <Form.Item
                  name={"email"}
                  rules={[
                    {
                      type: "email",
                      required: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Email Address" />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-row justify-evenly">
              <div className="min-w-[250px]">
                <h1 className="text-lg mb-2 ml-2">NIC</h1>
                <Form.Item
                  name={"nic"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="NIC" />
                </Form.Item>
              </div>
              <div className="min-w-[250px]">
                <h1 className="text-lg mb-2 ml-2">Contact No</h1>
                <Form.Item
                  name={"phone"}
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Contact No" autoComplete="off" />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-row justify-evenly">
              <div className="min-w-[250px] max-w-[250px]">
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
              <div className="min-w-[250px] max-w-[250px]">
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

            <div className="flex flex-row justify-evenly mt-16">
              <div>
                <button
                  type="reset"
                  className="rounded-lg border px-16 border-[#562595] bg-white inline-block pt-2 pb-2 text-md font-medium uppercase text-[#562595]"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                  onClick={() => {
                    form.resetFields();
                  }}
                >
                  Cancel
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="rounded-lg bg-[#562595] px-16  inline-block pt-2 pb-2 text-md font-medium uppercase text-neutral-50"
                  data-twe-ripple-init
                  data-twe-ripple-color="light"
                >
                  save
                </button>
              </div>
            </div>
          </div>
        </Form>

        <div></div>
      </div>
    </div>
  );
};

export default Registration;