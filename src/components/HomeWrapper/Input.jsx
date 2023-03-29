import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import LoadingIcon from "src/icons/LoadingIcon";
import {
  useAddChatGroupMutation,
  useAddChatMutation,
} from "src/services/api/chatApi";
import SendIcon from "../../icons/SendIcon";

const Input = ({ groupId }) => {
  const [addChat, { isLoading }] = useAddChatMutation();
  const [addChatGroup, { isLoading: isAdding }] = useAddChatGroupMutation();
  const [inputs, setInputs] = React.useState({});
  const ref = useRef(null);

  const navigate = useNavigate();
  const handleSend = async (e) => {
    e.preventDefault();
    if (!groupId) {
      const res = await addChatGroup();
      addChat({
        user_input: inputs.user_input,
        chat_group: res.data.data.id,
      });
      navigate(`/chat/${res.data.data.id}`);
    } else {
      addChat({
        user_input: inputs.user_input,
        chat_group: groupId,
      });
    }
    setInputs((values) => ({ ...values, user_input: "" }));
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend(e);
    }
  };

  useEffect(() => {
    ref.current.focus();
  });
  return (
    <form onSubmit={handleSend}>
      <div className="w-full bg-white border-t shadow-2xl	 text-center py-6 flex justify-center">
        <div className="w-1/2 flex">
          <input
            ref={ref}
            type="search"
            x-model="input"
            name="user_input"
            className="shadow w-full h-12 px-4 rounded-md border border-gray-100 text-gray-800 focus:outline-none"
            placeholder="Type to search..."
            value={inputs.user_input || ""}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="shadow inline-flex items-center justify-center w-12 h-12 ml-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
          >
            {isLoading ? <LoadingIcon /> : <SendIcon />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Input;
