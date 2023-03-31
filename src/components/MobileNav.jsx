import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from 'src/icons/AddIcon';
import BarIcon from 'src/icons/BarIcon';
import CloseIcon from 'src/icons/CloseIcon';
import Logo from './Logo';
import SidebarMenu from './SidebarMenu';

const MobileNavButton = ({ Icon, setNavbarOpen }) => {
  return (
    <button
      className="text-white cursor-pointer text-xl leading-none  border border-solid border-transparent rounded h-fit"
      type="button"
      onClick={() => setNavbarOpen((prev) => !prev)}
    >
      <Icon />
    </button>
  );
};
export default function MobileNav() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <nav className="lg:hidden absolute top-0 left-0 right-0 z-50 bg-zinc-800 flex flex-wrap items-center justify-between">
      <div className="w-full relative px-3 flex mx-auto justify-between h-14 items-center">
        <Logo />
        {navbarOpen ? (
          <MobileNavButton Icon={CloseIcon} setNavbarOpen={setNavbarOpen} />
        ) : (
          <MobileNavButton Icon={BarIcon} setNavbarOpen={setNavbarOpen} />
        )}
      </div>
      <div
        className={`w-full ${
          navbarOpen ? 'flex' : 'hidden'
        }  bg-zinc-800 flex-col relative duration-300 justify-between transition-all delay-75	`}
      >
        <SidebarMenu />
      </div>
    </nav>
  );
}
