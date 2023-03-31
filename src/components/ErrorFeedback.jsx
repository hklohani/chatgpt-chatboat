import React from 'react';

const ErrorFeedback = ({ message, absolute = '', ml = '' }) => {
  return (
    <span className={`${absolute} ${ml} flex items-center font-medium tracking-wide text-red-500 text-xs mt-1`}>
      {message}
    </span>
  );
};

export default ErrorFeedback;
