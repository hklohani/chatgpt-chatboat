import React from "react";
import { useGetChatsQuery } from "src/services/api/chatApi";

const ChatList = () => {
  // const { data, error, isLoading } = useGetChatsQuery();

  return (
    <div className="w-full h-full items-center justify-center flex gap-8 overflow-y-auto custom-scrolbar">
      <p className="text-[34px]">ChatGPT</p>
    </div>
  );
};

export default ChatList;
