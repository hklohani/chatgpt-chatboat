import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ErrorFeedback from 'src/components/ErrorFeedback';
import LoadingIcon from 'src/icons/LoadingIcon';
import { useAddChatGroupMutation, useAddChatMutation } from 'src/services/api/chatApi';
import SendIcon from '../../../icons/SendIcon';

const focusInput = (ref) => {
  ref.current.focus();
};
const Input = ({ groupId }) => {
  const navigate = useNavigate();
  const [addChat] = useAddChatMutation();
  const [addChatGroup] = useAddChatGroupMutation();
  const [inputs, setInputs] = React.useState({});
  const [showError, setShowError] = React.useState(false);
  const sendingInput = useSelector((state) => state.loading.sendingInput);

  const ref = useRef(null);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputs.user_input) {
      focusInput(ref);
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
      setInputs((values) => ({ ...values, user_input: '' }));
    }
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setShowError(false);
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(e);
    }
  };

  useEffect(() => {
    focusInput(ref);
  });
  return (
    <form
      onSubmit={handleSend}
      className="absolute bottom-0 right-0 left-0 bg-white shadow-2xl flex justify-center border-t text-center lg:h-30 h-20"
    >
      <div className="w-full lg:w-1/2 flex px-4 lg:px-0 items-center">
        <div className="w-full relative">
          <input
            rows={1}
            ref={ref}
            type="search"
            x-model="input"
            name="user_input"
            className={`resize-none placeholder:italic ${
              showError ? 'placeholder:text-red-500 ' : 'placeholder:text-slate-400'
            } w-full h-12 px-4 rounded-md border  text-gray-800 focus:outline-none pr-12`}
            placeholder={showError ? 'Please type valid input!' : 'Type to search...'}
            value={inputs.user_input || ''}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="submit"
            className="absolute top-1 bottom-1 right-1 inline-flex items-center justify-center w-10 h-10 text-indigo-100 transition-colors duration-150 bg-indigo-700 rounded-md focus:shadow-outline hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-blue-300 "
          >
            {sendingInput ? <LoadingIcon /> : <SendIcon />}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Input;
