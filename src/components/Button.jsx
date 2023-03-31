import React from 'react';

const Button = ({ title = '', icon = null, onClick, disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="button "
      className="flex justify-center w-full py-2 text-sm font-medium text-white focus:outline-none rounded-lg border border-gray-600 hover:bg-gray-700  focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 
      transform active:scale-90 transition-transform duration-300 ease-in-out"
    >
      {title}
    </button>
  );
};

export default Button;
