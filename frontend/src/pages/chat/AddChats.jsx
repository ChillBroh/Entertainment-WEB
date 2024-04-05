import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../Components/commonModals/Loader";

const AddChats = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const onFinish = async (values) => {
    setLoading(true);
    const token = localStorage.getItem("jsonwebtoken");

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const chatName = values.username;
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/chat/",
        { chatName: chatName },
        {
          headers,
        }
      );
      console.log("Response:", res.data);
      setLoading(false);
      navigate("/chat");
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </div>
  );
};

export default AddChats;
