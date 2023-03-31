import React from 'react';
import ChatList from './ChatList';
import { useParams } from 'react-router-dom';

const Chat = () => {
  const params = useParams();
  return <ChatList groupId={params.id} />;
};

export default Chat;
