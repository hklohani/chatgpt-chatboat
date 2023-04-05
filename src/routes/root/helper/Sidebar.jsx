import React from 'react';
import Logo from 'src/components/Logo';
import SidebarMenu from 'src/components/SidebarMenu';

const Sidebar = () => {
  return (
    <div className={`hidden lg:flex w-80 bg-zinc-800  flex-col h-screen duration-300 overflow-y-hidden`}>
      <div className={`flex flex-col h-full relative  justify-between`}>
        <div className="flex justify-center h-14 items-center">
          <Logo />
        </div>
        <SidebarMenu />
      </div>
    </div>
  );
};

export default Sidebar;
