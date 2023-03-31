import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, redirect, useNavigate, useParams } from 'react-router-dom';
import ChatIcon from 'src/icons/ChatIcon';
import DeleteIcon from 'src/icons/DeleteIcon';
import LoadingIcon from 'src/icons/LoadingIcon';
import { useDeleteChatGroupMutation, useGetChatGroupQuery } from 'src/services/api/chatApi';
import { setNewChatGroupId } from 'src/services/slice/chatSlice';
import Loading from './Loading';

const ChatTitleList = () => {
  const { deleteChatGroupButtomDisable, newChatGroupId } = useSelector((state) => state.chat);
  const { data, error, isLoading, isFetching } = useGetChatGroupQuery();
  const [deleteChatGroup, { isLoading: isDeleting, isError, isSuccess }] = useDeleteChatGroupMutation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await deleteChatGroup(id);
    if (id === newChatGroupId) {
      dispatch(setNewChatGroupId({ id: null }));
    }
    navigate('/');
  };

  if (isLoading) {
    return <Loading size="sm" />;
  }
  if (data?.data.length === 0) {
    return null;
  }
  return (
    <div className="p-2 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
      {data?.data?.map((item) => (
        <Link
          key={item.id}
          className={`flex justify-start rounded-lg border-gray-400 shadow p-2 gap-4 items-center hover:bg-gray-700 transition  ease-in-out  transform ${
            item.id == params.id ? 'bg-gray-600' : ''
          }`}
          to={`/chat/${item.id}`}
        >
          <ChatIcon />
          <p className="text-gray-300 whitespace-nowrap ">{item.title}</p>
          {item.id == params.id && (
            <button
              disabled={deleteChatGroupButtomDisable}
              className="bg-gray-600 absolute h-full right-0 transition transform ease-in-out bg-bottom rounded-lg p-1 cursor-pointer hover:bg-gray-700 "
              onClick={() => handleDelete(item.id)}
            >
              {isDeleting ? <LoadingIcon /> : <DeleteIcon />}
            </button>
          )}
        </Link>
      ))}
    </div>
  );
};

export default ChatTitleList;
