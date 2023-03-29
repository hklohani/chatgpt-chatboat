import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import LoadingIcon from "src/icons/LoadingIcon";
import {
  useAddChatGroupMutation,
  useAddChatMutation,
} from "src/services/api/chatApi";
import SendIcon from "../../../icons/SendIcon";

const Input = ({ groupId }) => {
  const [addChat] = useAddChatMutation();
  const [addChatGroup] = useAddChatGroupMutation();
  const [inputs, setInputs] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const sendingInput = useSelector((state) => state.loading.sendingInput);

  const ref = useRef(null);

  const navigate = useNavigate();
  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputs.user_input) {
      setShowError(true);
    } else {
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
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setShowError(false);
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
      <div className="w-full relative bg-white border-t shadow-2xl	 text-center py-6 lg:py-12 flex justify-center">
        <div className="w-full lg:w-1/2 flex px-4 lg:p-0">
          <div className="w-full relative">
            <input
              rows={1}
              ref={ref}
              type="search"
              x-model="input"
              name="user_input"
              className="resize-none shadow w-full h-12 px-4 rounded-md border  text-gray-800 focus:outline-none"
              placeholder="Type to search..."
              value={inputs.user_input || ""}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            {showError && (
              <span className="absolute flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                Please type valid input!
              </span>
            )}
          </div>
          <button
            type="submit"
            className="shadow inline-flex items-center justify-center w-12 h-12 ml-2 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-lg focus:shadow-outline hover:bg-indigo-800"
          >
            {sendingInput ? <LoadingIcon /> : <SendIcon />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Input;
