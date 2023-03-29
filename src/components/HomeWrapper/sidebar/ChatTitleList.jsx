import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatIcon from "src/icons/ChatIcon";
import DeleteIcon from "src/icons/DeleteIcon";
import {
  useDeleteChatGroupMutation,
  useGetChatGroupQuery,
} from "src/services/api/chatApi";

const ChatTitleList = ({ open }) => {
  const { data, error, isLoading, isFetching } = useGetChatGroupQuery();
  const [count, setCount] = useState(0);
  const [deleteChatGroup, { isLoading: isDeleting, isError, isSuccess }] =
    useDeleteChatGroupMutation();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.data.length !== 0 && count === 0) {
      navigate(`/chat/${data?.data[0].id}`);
      setCount(1);
    }
    if (data && data.data.length !== 0 && isSuccess) {
      navigate(`/chat/${data?.data[0].id}`);
    }
    if (data && data.data.length === 0) {
      navigate(`/chat`);
    }
  }, [data]);

  const handleDelete = async (id) => {
    await deleteChatGroup(id);
  };
  return data?.data?.map((item) => (
    <Link
      key={item.id}
      className={`flex justify-start rounded-lg border-gray-400 shadow p-2 gap-4 items-center hover:bg-gray-700 transition  ease-in-out  transform ${
        item.id == params.id ? "bg-gray-600" : ""
      }`}
      to={`/chat/${item.id}`}
    >
      {!open ? (
        <p className="text-white">1</p>
      ) : (
        <>
          <ChatIcon />
          <p className="text-gray-300 ">{item.title}</p>
        </>
      )}
      {item.id == params.id && (
        <div
          className="absolute right-0 transition transform  ease-in-out  rounded-full p-1 cursor-pointer "
          onClick={() => handleDelete(item.id)}
        >
          <span className="text-gray-300">
            <DeleteIcon />
          </span>
        </div>
      )}
    </Link>
  ));
};

export default ChatTitleList;
