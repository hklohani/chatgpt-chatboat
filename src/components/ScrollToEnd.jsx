import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const ScrollToEnd = ({ data, sendingInput }) => {
  const bottomRef = useRef(null);
  const { id } = useParams();

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
  };
  useEffect(() => {
    const scrollContainer = document.getElementById('scroll-container');
    scrollContainer.scrollTo({ top: scrollContainer.scrollHeight, behavior: 'smooth' });
  }, [data, sendingInput, id]);

  return (
    <>
      <div ref={bottomRef} className="absolute bottom-0 left-0 right-0" />
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
