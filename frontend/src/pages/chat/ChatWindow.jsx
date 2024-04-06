import React, { useEffect, useState } from "react";
import HeaderAuthenticate from "../../Layouts/HeaderAuthenticated";
import Footer from "../../Layouts/Footer";
import { Divider } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../../Components/commonModals/Loader";

const ChatWindow = () => {
  const [loading, isLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedChat, setSelectedChat] = useState(null);
  const [isOrganizer, setIsOrganizer] = useState(false);
  useEffect(() => {
    const getChatDetails = async () => {
      try {
        isLoading(true);
        const token = localStorage.getItem("jsonwebtoken");
        const role = localStorage.getItem("role");
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
        if (role === "Organizer") {
          setIsOrganizer(true);
        }
        isLoading(false);
      } catch (error) {
        isLoading(false);
        console.error("Error fetching chats:", error);
      }
    };

    getChatDetails();
  }, []);

  useEffect(() => {
    if (selectedChat) {
      const getMessages = async () => {
        try {
          isLoading(true);
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
          isLoading(false);
        } catch (error) {
          isLoading(false);
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
        alert("Empty");
      } else {
        const newMessageData = response.data;
        console.log(newMessageData);
        setMessages([...messages, newMessageData]);
        setNewMessage("");

        console.log(messages);
      }
    } catch (error) {
      setTimeout(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error adding messages",
        });
      }, 500);
      console.error("Error adding message:", error);
      return;
    }
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <HeaderAuthenticate />
          <div className="bg-white px-16">
            <div className=" px-16 grid grid-cols-2 bg-[#C7ADCE]">
              <div className="bg-[#562595]">
                <div className="px-10 mt-5 box-border max-h-[50px] flex sm:flex-row justify-start">
                  <input
                    type="text"
                    placeholder="Search The Event"
                    className="max-h-[70px] p-3 text-lg w-full rounded-lg"
                  />
                </div>
                <div
                  style={{ maxHeight: "50vh" }}
                  className="grid mt-10 grid-rows px-16  text-white overflow-y-auto"
                >
                  {chats.length === 0 ? (
                    <div className="text-center text-lg p-10">
                      There are No Events in the List
                    </div>
                  ) : (
                    chats.map((chat, index) => (
                      <React.Fragment key={index}>
                        <button onClick={() => setSelectedChat(chat)}>
                          <div className="grid grid-cols-3 items-center ml-16">
                            <div className="text-2xl text-[#C7ADCE] font-extrabold text-center">
                              {chat.chatName}
                            </div>
                            <div className="text-center text-[#C7ADCE] font-extrabold  text-2xl">
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
                                src={chat.chatImg}
                                alt=""
                                style={{
                                  width: "100px",
                                  height: "100px",
                                  cursor: "pointer",
                                }}
                                className="rounded-full"
                              />
                            </div>
                          </div>
                        </button>
                        <Divider style={{ borderColor: "white" }} />
                      </React.Fragment>
                    ))
                  )}
                </div>
                {isOrganizer && (
                  <div className="text-white text-right">
                    <Link to={"/add-chat"}>
                      <button className="text-5xl  p-16">+</button>
                    </Link>
                  </div>
                )}
              </div>
              <div className="bg-white grid grid-rows">
                <div className="p-2 bg-[#EEF1F4] flex sm:flex-row justify-start">
                  <img
                    src={
                      selectedChat?.chatImg
                        ? selectedChat?.chatImg
                        : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                    }
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
                <div className="h-[60vh] overflow-y-auto">
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
      )}
    </div>
  );
};

export default ChatWindow;
