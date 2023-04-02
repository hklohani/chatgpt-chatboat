import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const scrollToBottom = (messagesEnd) => {
  messagesEnd.scrollIntoView({ behavior: 'smooth',block: 'start', inline: 'nearest' });
};
const ScrollToEnd = ({ data, sendingInput }) => {
  let messagesEnd;
  const { id } = useParams();

  useEffect(() => {
    if (messagesEnd) {
      scrollToBottom(messagesEnd);
    }
  }, [messagesEnd, data, sendingInput, id]);

  return (
    <>
      <div
        style={{ float: 'left', clear: 'both' }}
        ref={(el) => {
          messagesEnd = el;
        }}
      />
      <button
        onClick={scrollToBottom}
        className="cursor-pointer absolute right-6 bottom-6 z-10 rounded-full border border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 m-1"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </button>
    </>
  );
};

export default ScrollToEnd;
