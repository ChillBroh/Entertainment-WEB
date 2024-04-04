import { useState } from "react";
import React from "react";
import bg from "../Components/Assets/dj-playing-and-mixing-music-in-nightclub-party-at-night-edm-dance-music-club-with-crowd-of-young-people-free-photo.jpg";
import { Form, Input } from "antd";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import uploadFileToFirebase from "../utils/UploadFilesToFIreBase";

const OrganizerRegistration = () => {
  const [file, setFile] = useState("");
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const fullName = values.name.trim();
    const email = values.email.trim();
    const phone = values.phone.trim();
    const address = values.address.trim();
    const person1 = values.person1.trim();
    const phone1 = values.phone1.trim();
    const person2 = values.person2.trim();
    const phone2 = values.phone2.trim();
    const pass = values.password.trim();
    let uploadImg = "No Image";
    const role = "Organizer";
    const organizerId = Math.floor(10000 + Math.random() * 90000);
    if (
      fullName === "" ||
      email === "" ||
      phone === "" ||
      address === "" ||
      person1 === "" ||
      phone1 === "" ||
      person2 === "" ||
      phone2 === "" ||
      pass === ""
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "All Fields Required!",
      });
      return;
    }
    try {
      if (file) {
        const response = await uploadFileToFirebase(file);
        uploadImg = response;
      }

      const response = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          organizerId,
          fullName,
          email,
          phone,
          address,
          uploadImg,
          person1,
          phone1,
          person2,
          phone2,
          pass,
          role,
        }
      );
      Swal.fire(response.data.message, "", "success");
      navigate(`/registered-organizer/${organizerId}`);
    } catch (error) {
      console.log(error.response.data);
      Swal.fire(error.response.data.message, "", "error");
    }
  };
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-full">
      {/* Image */}
      <div className="md:flex md:justify-end">
        <img
          src={bg}
          alt="dj"
          className="object-cover h-full w-full md:max-h-full md:w-auto"
        />
      </div>

      {/* Form */}
      <div className="flex flex-col mt-5 px-2 md:pt-10 lg:pt-0 ">
        <div className="text-3xl text-center">Create organizer Profile</div>
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
            {/* Business name and contact */}
            <div className="flex flex-row justify-evenly">
              <div className="min-w-[250px]">
                <h1 className="text-lg mb-2 ml-2">Organization Name</h1>
                <Form.Item
                  name={"name"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Organization Name",
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Organization Name" />
                </Form.Item>
              </div>
              <div className="min-w-[250px]">
                <h1 className="text-lg mb-2 ml-2">Contact No</h1>
                <Form.Item
                  name={"phone"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Oragnization's Contact No",
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Business Number" autoComplete="off" />
                </Form.Item>
              </div>
            </div>
            {/* email  */}
            <div className="min-w-[250px] px-16">
              <h1 className="text-lg mb-2 ml-2">Business Email</h1>
              <Form.Item
                name={"email"}
                rules={[
                  {
                    type: "email",
                    required: true,
                    message: "Please Enter Organization's Email",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="Business Email" />
              </Form.Item>
            </div>
            {/* address */}
            <div className="min-w-[250px] px-16">
              <h1 className="text-lg mb-2 ml-2">Business Address</h1>
              <Form.Item
                name={"address"}
                rules={[
                  {
                    type: "text",
                    required: true,
                    message: "Please Enter Organizaitons's Address",
                  },
                ]}
                hasFeedback
              >
                <Input placeholder="ABC Company, Malabe, 2345" />
              </Form.Item>
            </div>
            {/* person1 */}
            <div className="flex flex-row justify-evenly">
              <div className="min-w-[250px]">
                <h1 className="text-lg mb-2 ml-2">Contact Person 1</h1>
                <Form.Item
                  name={"person1"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Person 1 Name",
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Person 1 Name" />
                </Form.Item>
              </div>
              <div className="min-w-[250px]">
                <h1 className="text-lg mb-2 ml-2">Contact No</h1>
                <Form.Item
                  name={"phone1"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter person 1's Contact No",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="Person 1 Contact Number"
                    autoComplete="off"
                  />
                </Form.Item>
              </div>
            </div>
            {/* person2 */}
            <div className="flex flex-row justify-evenly">
              <div className="min-w-[250px]">
                <h1 className="text-lg mb-2 ml-2">Contact Person 2</h1>
                <Form.Item
                  name={"person2"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Person 2 Name",
                    },
                  ]}
                  hasFeedback
                >
                  <Input placeholder="Person 2 Name" />
                </Form.Item>
              </div>
              <div className="min-w-[250px]">
                <h1 className="text-lg mb-2 ml-2">Contact No</h1>
                <Form.Item
                  name={"phone2"}
                  rules={[
                    {
                      required: true,
                      message: "Please Enter person 2's Contact No",
                    },
                  ]}
                  hasFeedback
                >
                  <Input
                    placeholder="Person 2 Contact Number"
                    autoComplete="off"
                  />
                </Form.Item>
              </div>
            </div>
            {/* password */}
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

            <div className="flex flex-row justify-evenly mt-10 mb-5">
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

export default OrganizerRegistration;
