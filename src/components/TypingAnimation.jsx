import React from 'react';

const Typing = ({ size = 8, bg = 'gray' }) => {
  const style = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor: bg,
  };

  return (
    <>
      <div className={`typing__dot `} style={style} />
      <div className={`typing__dot `} style={style} />
      <div className={`typing__dot `} style={style} />
    </>
  );
};

export default Typing;
