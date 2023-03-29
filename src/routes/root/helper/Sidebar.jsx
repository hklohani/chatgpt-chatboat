import React from "react";
import SidebarMenu from "src/components/SidebarMenu";

const Sidebar = () => {
  return (
    <div
      className={`w-0 lg:w-80 bg-zinc-800 flex flex-col h-screen relative duration-300 justify-between`}
    >
      <SidebarMenu />
    </div>
  );
};

export default Sidebar;
