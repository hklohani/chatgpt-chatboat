import React from "react";
import { useState } from "react";
import Button from "src/components/Button";
import AddIcon from "src/icons/AddIcon";
import DeleteIcon from "src/icons/DeleteIcon";
import LogoutIcon from "src/icons/LogoutIcon";
import { useLogoutMutation } from "src/services/api/authApi";
import {
  chatApi,
  useAddChatGroupMutation,
  useDeleteAllChatGroupMutation,
} from "src/services/api/chatApi";
import ChatTitleList from "./ChatTitleList";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const Sidebar = ({ setMode, mode }) => {
  const sendingInput = useSelector((state) => state.loading.sendingInput);
  const newChatButtonDisable = useSelector(
    (state) => state.chat.newChatButtonDisable
  );
  const [open, setOpen] = useState(true);
  const [count, setCount] = useState(5);
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();
  const [addChatGroup, { isLoading: isAdding }] = useAddChatGroupMutation();

  const [deleteAllChatGroup, { isLoading: isDeleting, isError, isSuccess }] =
    useDeleteAllChatGroupMutation();
  const navigate = useNavigate();
  const Menus = [
    {
      title: "Clear",
      icon: DeleteIcon(),
      onClick: () => {
        deleteAllChatGroup();
      },
    },
    { title: "Logout", src: "Logout", icon: LogoutIcon(), onClick: logout },
  ];

  const addGroup = async () => {
    const res = await addChatGroup();
    navigate(`/chat/${res.data.data.id}`);
  };

  return (
    <div
      className={` ${
        open ? "w-80" : "w-20 "
      } bg-zinc-800 flex flex-col h-screen relative duration-300 justify-between`}
    >
      <div className="sidebar-scrollbar overflow-y-auto overflow-x-hidden">
        <div className="my-4 p-2">
          <Button
            title="New Chat"
            icon={AddIcon()}
            onClick={addGroup}
            disabled={sendingInput || newChatButtonDisable}
          />
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
