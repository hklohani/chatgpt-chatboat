import Input from "./Input";

const BodyWrapper = ({ mode, chatlist, groupId }) => {
  return (
    <div className={`bg-slate-50 h-screen w-full flex flex-col justify-between`}>
      {chatlist}
      <Input groupId={groupId} />
    </div>
  );
};
export default BodyWrapper;
