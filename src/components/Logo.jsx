import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link className="text-sm font-bold border-b flex items-center uppercase text-white h-fit" href="/">
      Tattvam
    </Link>
  );
};

export default Logo;
