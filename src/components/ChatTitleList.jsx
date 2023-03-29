import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import ChatIcon from "src/icons/ChatIcon";
import DeleteIcon from "src/icons/DeleteIcon";
import {
  useDeleteChatGroupMutation,
  useGetChatGroupQuery,
} from "src/services/api/chatApi";
import { setNewChatGroupId } from "src/services/slice/chatSlice";

const ChatTitleList = () => {
  const { deleteChatGroupButtomDisable, newChatGroupId } = useSelector(
    (state) => state.chat
  );
  const { data, error, isLoading, isFetching } = useGetChatGroupQuery();
  const [deleteChatGroup, { isLoading: isDeleting, isError, isSuccess }] =
    useDeleteChatGroupMutation();
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    await deleteChatGroup(id);
    if (id === newChatGroupId) {
      dispatch(setNewChatGroupId({ id: null }));
    }
    navigate("/");
  };

  return data?.data?.map((item) => (
    <Link
      key={item.id}
      className={`flex justify-start rounded-lg border-gray-400 shadow p-2 gap-4 items-center hover:bg-gray-700 transition  ease-in-out  transform ${
        item.id == params.id ? "bg-gray-600" : ""
      }`}
      to={`/chat/${item.id}`}
    >
      <ChatIcon />
      <p className="text-gray-300 ">{item.title}</p>
      {item.id == params.id && (
        <button
          disabled={deleteChatGroupButtomDisable}
          className="absolute right-0 transition transform  ease-in-out  rounded-full p-1 cursor-pointer "
          onClick={() => handleDelete(item.id)}
        >
          <DeleteIcon />
        </button>
      )}
    </Link>
  ));
};

export default ChatTitleList;
