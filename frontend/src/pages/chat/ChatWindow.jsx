import React from "react";
import HeaderAuthenticate from "../../Layouts/HeaderAuthenticated";
import Footer from "../../Layouts/Footer";
import logo from "../../Components/Assets/logoHeader.png";
import organizer from "../../Components/Assets/organizer.jpg";
import { Divider } from "antd";

const ChatWindow = () => {
  return (
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
            <div className="grid mt-10 grid-rows px-16  text-white">
              <div className="grid grid-cols-3 items-center ml-16">
                <div className="text-2xl text-[#C7ADCE] font-extrabold text-center">
                  Vibe Vault
                </div>
                <div className="text-center text text-[#C7ADCE] font-extrabold text-2xl">
                  DEC 2
                </div>
                <div className="flex justify-center">
                  <img
                    src={organizer}
                    alt=""
                    style={{ width: "70px", height: "70px", cursor: "pointer" }}
                    className="rounded-full"
                  />
                </div>
              </div>
              <Divider style={{ borderColor: "white" }} />
              <div className="grid grid-cols-3 items-center ml-16">
                <div className="text-2xl text-[#C7ADCE] font-extrabold text-center">
                  Vibe Vault
                </div>
                <div className="text-center text-[#C7ADCE] font-extrabold  text-2xl">
                  DEC 2
                </div>
                <div className="flex justify-center">
                  <img
                    src={organizer}
                    alt=""
                    style={{ width: "70px", height: "70px", cursor: "pointer" }}
                    className="rounded-full"
                  />
                </div>
              </div>
              <Divider style={{ borderColor: "white" }} />
              <div className="grid grid-cols-3 items-center ml-16">
                <div className="text-2xl text-[#C7ADCE] font-extrabold text-center">
                  Vibe Vault
                </div>
                <div className="text-center text-[#C7ADCE] font-extrabold  text-2xl">
                  DEC 2
                </div>
                <div className="flex justify-center">
                  <img
                    src={organizer}
                    alt=""
                    style={{ width: "70px", height: "70px", cursor: "pointer" }}
                    className="rounded-full"
                  />
                </div>
              </div>
              <Divider style={{ borderColor: "white" }} />
            </div>
          </div>
          <div className="bg-white grid grid-rows">
            <div className="p-2 bg-[#EEF1F4] flex sm:flex-row justify-start">
              <img
                src={logo}
                alt=""
                className="rounded-full"
                style={{ width: "70px", height: "70px", cursor: "pointer" }}
              />{" "}
              <div className="grid ml-3 p-3 grid-rows">
                <div className="text-2xl font-bold">Vibe Vault</div>
                <div>4 Messages</div>
              </div>
            </div>
            <div className="h-[70vh] grid grid-rows overflow-y-auto">
              <div className="p-2">
                <h1 className="bg-[#562595] rounded-3xl text-md box-border text-white p-3 inline-block">
                  Hi All...
                </h1>
              </div>
              <div className="p-2">
                <h1 className="bg-[#562595] rounded-3xl text-md box-border text-white p-3 inline-block">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum
                  beatae, sapiente praesentium exercitationem officiis doloribus
                  eveniet molestias tenetur voluptates veniam. Vitae architecto
                  dolorum quisquam dolores explicabo inventore quaerat error,
                  voluptatem hic nostrum incidunt nam eius provident sed, nulla
                  minima facere dicta numquam doloremque saepe. Fugit sit neque
                  quo quas doloribus.
                </h1>
              </div>
              <div className="p-2">
                <h1 className="bg-[#562595] rounded-3xl text-md box-border text-white p-3 inline-block">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Veniam nisi asperiores sapiente, inventore ad obcaecati
                  voluptatem maxime itaque at debitis.
                </h1>
              </div>
              <div className="p-2">
                <h1 className="bg-[#562595] rounded-3xl text-md box-border text-white p-3 inline-block">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel
                  ab aut exercitationem ipsam illum beatae.
                </h1>
              </div>
              <div className="p-2">
                <h1 className="bg-[#562595] rounded-3xl text-md box-border text-white p-3 inline-block">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel
                  ab aut exercitationem ipsam illum beatae.
                </h1>
              </div>
              <div className="p-2">
                <h1 className="bg-[#562595] rounded-3xl text-md box-border text-white p-3 inline-block">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vel
                  ab aut exercitationem ipsam illum beatae.
                </h1>
              </div>
            </div>
            <div className="p-2 bg-[#EEF1F4] flex sm:flex-row justify-start">
              <input type="text" className="w-full p-2" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChatWindow;
