import React from "react";
import HomeWrapper from "src/components/HomeWrapper";
import ChatList from "./ChatList";
import { useParams } from "react-router-dom";

const Chat = () => {
  const params = useParams();
  return (
    <>
      <HomeWrapper groupId={params.id}>
        <ChatList groupId={params.id} />
      </HomeWrapper>
    </>
  );
};

export default Chat;
