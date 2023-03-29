import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BodyWrapper from "./BodyWrapper";
import Sidebar from "./sidebar";

const HomeWrapper = ({ children, groupId }) => {
  const [mode, setMode] = useState("light");
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  return (
    <div className="flex">
      <Sidebar mode={mode} setMode={setMode} />
      <BodyWrapper mode={mode} chatlist={children} groupId={groupId} />
    </div>
  );
};
export default HomeWrapper;
