import React from 'react';
import { useState } from 'react';
import Button from 'src/components/Button';
import AddIcon from 'src/icons/AddIcon';
import DeleteIcon from 'src/icons/DeleteIcon';
import LogoutIcon from 'src/icons/LogoutIcon';
import { useLogoutMutation } from 'src/services/api/authApi';
import { chatApi, useAddChatGroupMutation, useDeleteAllChatGroupMutation } from 'src/services/api/chatApi';
import ChatTitleList from './ChatTitleList';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewChatGroupId } from 'src/services/slice/chatSlice';
import LoadingIcon from 'src/icons/LoadingIcon';
const SidebarMenu = () => {
  const { newChatButtonDisable, newChatGroupId } = useSelector((state) => state.chat);
  const [logout, { isLoading: loggingOut }] = useLogoutMutation();
  const [addChatGroup, { isLoading: isAdding }] = useAddChatGroupMutation();
  const dispatch = useDispatch();
  const [deleteAllChatGroup, { isLoading: isDeleting, isError, isSuccess }] = useDeleteAllChatGroupMutation();
  const navigate = useNavigate();
  const Menus = [
    {
      title: 'Clear',
      icon: isDeleting ? <LoadingIcon /> : DeleteIcon(),
      onClick: async () => {
        await deleteAllChatGroup();
        dispatch(setNewChatGroupId({ id: null }));
        navigate('/');
      },
    },
    {
      title: 'Logout',
      src: 'Logout',
      icon: loggingOut ? <LoadingIcon /> : LogoutIcon(),
      onClick: logout,
    },
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
      <div className="h-full">
        <div className="mb-4 p-2">
          <Button
            title={isAdding ? <LoadingIcon /> : 'New Chat'}
            icon={AddIcon()}
            onClick={addGroup}
            disabled={newChatButtonDisable}
          />
        </div>
        <ChatTitleList />
      </div>
      <ul className="p-2 flex flex-col justify-end relative">
        {Menus.map((Menu, index) => (
          <li
            key={index}
            className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center
        ${Menu.gap ? 'mt-9' : 'mt-2'} ${index === 0 && 'bg-light-white'} `}
            onClick={Menu.onClick}
          >
            <span className="mr-3">{Menu.icon}</span>
            <span className={` origin-left duration-200`}>{Menu.title}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

export default SidebarMenu;
