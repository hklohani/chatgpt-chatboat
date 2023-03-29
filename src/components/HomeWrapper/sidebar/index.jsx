import React from "react";
import { useState } from "react";
import Button from "src/components/Button";
import AddIcon from "src/icons/AddIcon";
import DeleteIcon from "src/icons/DeleteIcon";
import LogoutIcon from "src/icons/LogoutIcon";
import { useLogoutMutation } from "src/services/api/authApi";
import {
  useAddChatGroupMutation,
  useGetChatGroupQuery,
} from "src/services/api/chatApi";
import controlImage from "src/assets/control.png";
import ChatTitleList from "./ChatTitleList";
import { useNavigate } from "react-router-dom";
const Sidebar = ({ setMode, mode }) => {
  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(5);
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();
  const [addChatGroup, { isLoading: isAdding }] = useAddChatGroupMutation();
  const navigate = useNavigate();
  const Menus = [
    // { title: "Dashboard", src: "Chart_fill" },
    // { title: "Inbox", src: "Chat" },
    // { title: "Accounts", src: "User", gap: true },
    // { title: "Schedule ", src: "Calendar" },
    // { title: "Search", src: "Search" },
    { title: "Clear", icon: DeleteIcon() },
    // {
    //   title: mode,
    //   onClick: () => {
    //     if (localStorage.getItem("mode") === "dark") {
    //       setMode("Light Mode");
    //       localStorage.setItem("mode", "light");
    //     } else {
    //       setMode("Dark Mode");
    //       localStorage.setItem("mode", "dark");
    //     }
    //   },
    //   icon: mode === "Light Mode" ? Sun() : Dark(),
    // },
    { title: "Logout", src: "Logout", icon: LogoutIcon(), onClick: logout },
  ];

  const addGroup = async () => {
    const res = await addChatGroup();
    // console.log(res.data.data.id);
    navigate(`/chat/${res.data.data.id}`);
  };

  return (
    <div
      className={` ${
        open ? "w-80" : "w-20 "
      } bg-zinc-800 flex flex-col h-screen relative duration-300 justify-between`}
    >
      {/* <img
        src={controlImage}
        className={`absolute cursor-pointer -right-3 top-4 w-7 border-dark-purple
     border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      /> */}
      {/* <div className="flex gap-x-4 items-center">
    <img
      src="./src/assets/logo.png"
      className={`cursor-pointer duration-500 ${
        open && "rotate-[360deg]"
      }`}
    />
    <h1
      className={`text-white origin-left font-medium text-xl duration-200 ${
        !open && "scale-0"
      }`}
    >
      Unicepts AI
    </h1>
  </div> */}
      <div className="sidebar-scrollbar overflow-y-auto overflow-x-hidden">
        <div className="my-4 p-2">
          {!open ? (
            <Button title={AddIcon()} onClick={addGroup} />
          ) : (
            <Button title="New Chat" icon={AddIcon()} onClick={addGroup} />
          )}
        </div>
        <div className="p-2 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
          <ChatTitleList open={open} />
        </div>
      </div>

      <ul className="p-2 flex flex-col justify-end ">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
        ${Menu.gap ? "mt-9" : "mt-2"} ${index === 0 && "bg-light-white"} `}
            onClick={Menu.onClick}
          >
            {/* <img src={`./src/icons/${Menu.icon}`} /> */}
            {Menu.icon}
            <span className={`${!open && "hidden"} origin-left duration-200`}>
              {Menu.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
