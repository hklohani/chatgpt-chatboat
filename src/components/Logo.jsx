import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <Link className="text-sm font-bold flex items-center uppercase text-white h-fit" href="/">
      unicepts ai
    </Link>
  );
};

export default Logo;
