import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ChatIcon from "src/icons/ChatIcon";
import { useGetChatGroupQuery } from "src/services/api/chatApi";

const ChatTitleList = ({ open }) => {
  const { data, error, isLoading, isFetching } = useGetChatGroupQuery();
  const [count, setCount] = useState(0);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.data.length !== 0 && count === 0) {
      navigate(`/chat/${data?.data[0].id}`);
      setCount(1);
    }
  }, [data]);

  return data?.data?.map((item) => (
    <Link
      key={item.id}
      className={`flex justify-start rounded-lg border-gray-400 shadow p-2 gap-4 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform ${
        item.id == params.id ? "bg-gray-500" : ""
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
    </Link>
  ));
};

export default ChatTitleList;
