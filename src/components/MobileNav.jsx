import React from "react";
import AddIcon from "src/icons/AddIcon";
import BarIcon from "src/icons/BarIcon";
import CloseIcon from "src/icons/CloseIcon";
import SidebarMenu from "./SidebarMenu";

export default function MobileNav({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="lg:hidden relative  bg-zinc-800 container flex flex-wrap items-center justify-between">
        <div className="w-full relative flex  p-3 mx-auto justify-between">
          <a
            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
            href="#pablo"
          >
            unicepts ai
          </a>
          {navbarOpen ? (
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <CloseIcon />
            </button>
          ) : (
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <BarIcon />
            </button>
          )}
        </div>
        {navbarOpen && (
          <div
            className={`w-full  flex flex-col h-full relative duration-300 justify-between`}
          >
            <SidebarMenu />
          </div>
        )}
      </nav>
    </>
  );
}
