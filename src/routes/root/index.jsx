import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import MobileNav from 'src/components/MobileNav';
import Input from './helper/Input';
import Sidebar from './helper/Sidebar';

const Root = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const params = useParams();
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

  return (
    <>
      <MobileNav />
      <div className="flex">
        <Sidebar />
        <div className={`bg-slate-50 h-screen w-full flex flex-col justify-end relative`}>
          <Outlet />
          <Input groupId={params.id} />
        </div>
      </div>
    </>
  );
};
export default Root;
