import React from "react";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddChats = () => {
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log("Success:", values);
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
      navigate("/chat");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
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
        onFinishFailed={onFinishFailed}
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
  );
};

export default AddChats;
