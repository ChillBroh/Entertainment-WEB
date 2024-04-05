import React, { useEffect, useState, useRef } from "react";
import HeaderAuthenticate from "../../Layouts/HeaderAuthenticated";
import Footer from "../../Layouts/Footer";
import logo from "../../Components/Assets/logoHeader.png";
import organizer from "../../Components/Assets/organizer.jpg";
import { Divider } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";

const ChatWindow = () => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const getChatDetails = async () => {
      try {
        const token = localStorage.getItem("jsonwebtoken");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const chats = await axios.get(
          "http://localhost:5000/api/v1/chat/",
          config
        );
        setChats(chats.data);
        setSelectedChat(chats.data[0]);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };

    getChatDetails();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const getMessages = async () => {
        try {
          const token = localStorage.getItem("jsonwebtoken");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const chatId = selectedChat.id;
          const messages = await axios.get(
            `http://localhost:5000/api/v1/message/${chatId}`,
            config
          );
          setMessages(messages.data);
          scrollToBottom();
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      getMessages();
    } else {
      setMessages([]);
    }
  }, [selectedChat]);

  const addMessage = async () => {
    try {
      const token = localStorage.getItem("jsonwebtoken");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:5000/api/v1/message`,
        { message: newMessage, chatId: selectedChat.id },
        config
      );
      if (response.message) {
        alert("bye");
      } else {
        const newMessageData = response.data;
        setMessages([...messages, newMessageData]);
        setNewMessage("");
        scrollToBottom();
      }
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  const isOrganizer = true;

  // Function to scroll to the bottom of the chat container
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  return (
    <div>
      <HeaderAuthenticate />
      <div className="bg-white px-16">
        <div className=" px-16 grid grid-cols-2 bg-[#C7ADCE]">
          <div className="bg-[#562595]">
            <div className="px-10 mt-5 box-border max-h-[50px] flex sm:flex-row justify-start">
              {/* Search input */}
            </div>
            <div
              style={{ maxHeight: "60vh" }}
              className="grid mt-10 grid-rows px-16  text-white overflow-y-auto"
            >
              {/* Chat list */}
              {chats.map((chat, index) => (
                <React.Fragment key={index}>
                  <button onClick={() => setSelectedChat(chat)}>
                    <div className="grid grid-cols-3 items-center ml-16">
                      <div className="text-3xl text-[#C7ADCE] font-extrabold text-center">
                        {chat.chatName}
                      </div>
                      <div className="text-center text-[#C7ADCE] font-extrabold  text-3xl">
                        {(() => {
                          const dateString = chat.createdDate;
                          const date = new Date(dateString);
                          const month = date.toLocaleString("default", {
                            month: "short",
                          });
                          const day = date.getDate();
                          return `${month} ${day}`;
                        })()}
                      </div>
                      <div className="flex justify-center">
                        <img
                          src={organizer}
                          alt=""
                          style={{
                            width: "120px",
                            height: "120px",
                            cursor: "pointer",
                          }}
                          className="rounded-full"
                        />
                      </div>
                    </div>
                  </button>
                  <Divider style={{ borderColor: "white" }} />
                </React.Fragment>
              ))}
            </div>
            <div className="text-white text-right">
              <Link to={"/add-chat"}>
                <button className="text-5xl  p-16">+</button>
              </Link>
            </div>
          </div>
          <div className="bg-white grid grid-rows" ref={chatContainerRef}>
            <div className="p-2 bg-[#EEF1F4] flex sm:flex-row justify-start">
              <img
                src={logo}
                alt=""
                className="rounded-full"
                style={{ width: "70px", height: "70px", cursor: "pointer" }}
              />{" "}
              <div className="grid ml-3 p-3 grid-rows">
                <div className="text-2xl font-bold">
                  {selectedChat?.chatName}
                </div>
                <div>{messages.length} Messages</div>
              </div>
            </div>
            <div className="h-[70vh] grid grid-rows overflow-y-auto">
              {messages.length === 0 ? (
                <div className="text-center text-lg p-10">
                  There are No messages in this chat
                </div>
              ) : (
                messages.map((message, index) => (
                  <div className="p-4 max-w-[90%]" key={index}>
                    <h1 className="bg-[#562595] rounded-3xl text-md box-border text-white p-3 inline-block">
                      {message.message}
                    </h1>
                  </div>
                ))
              )}
            </div>
            <div className="p-2  max-w-[90%] ml-5 flex sm:flex-row justify-start">
              <input
                type="text"
                className="w-full border-4 border-[#EEF1F4] mb-16 p-2"
                disabled={isOrganizer ? false : true}
                placeholder={
                  isOrganizer
                    ? "Enter Your Message"
                    : "Sending Messaged is not allowed"
                }
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addMessage();
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatWindow;
