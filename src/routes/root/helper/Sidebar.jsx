import React from 'react';
import Logo from 'src/components/Logo';
import SidebarMenu from 'src/components/SidebarMenu';

const Sidebar = () => {
  return (
    <div className={`w-0 lg:w-80 bg-zinc-800 flex flex-col h-screen duration-300`}>
      <div className="flex justify-center h-14 items-center">
        <Logo />
      </div>
      <div className={` flex flex-col h-full relative  justify-between`}>
        <SidebarMenu />
      </div>
    </div>
  );
};

export default Sidebar;
