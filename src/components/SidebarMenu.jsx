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
import { useDispatch, useSelector } from "react-redux";
import { setNewChatGroupId } from "src/services/slice/chatSlice";
const SidebarMenu = () => {
  const { newChatButtonDisable, newChatGroupId } = useSelector(
    (state) => state.chat
  );
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();
  const [addChatGroup, { isLoading: isAdding }] = useAddChatGroupMutation();
  const dispatch = useDispatch();
  const [deleteAllChatGroup, { isLoading: isDeleting, isError, isSuccess }] =
    useDeleteAllChatGroupMutation();
  const navigate = useNavigate();
  const Menus = [
    {
      title: "Clear",
      icon: DeleteIcon(),
      onClick: async () => {
        await deleteAllChatGroup();
        dispatch(setNewChatGroupId({ id: null }));
        navigate("/");
      },
    },
    { title: "Logout", src: "Logout", icon: LogoutIcon(), onClick: logout },
  ];

  const addGroup = async () => {
    if (newChatGroupId) {
      navigate(`/chat/${newChatGroupId}`);
    } else {
      const res = await addChatGroup();
      dispatch(setNewChatGroupId({ id: res.data.data.id }));
      navigate(`/chat/${res.data.data.id}`);
    }
  };

  return (
    <>
      <div className="sidebar-scrollbar overflow-y-auto overflow-x-hidden">
        <div className="my-4 p-2">
          <Button
            title="New Chat"
            icon={AddIcon()}
            onClick={addGroup}
            disabled={newChatButtonDisable}
          />
        </div>
        <div className="p-2 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
          <ChatTitleList />
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
            <span className={` origin-left duration-200`}>{Menu.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarMenu;
