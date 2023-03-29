import React from "react";

const Button = ({ title = "", icon = null, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button "
      className="flex justify-center w-full py-2 text-sm font-medium text-white focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-400  focus:z-10 focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
    >
      {title}
    </button>
  );
};

export default Button;
