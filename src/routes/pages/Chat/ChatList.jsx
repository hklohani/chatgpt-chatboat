import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "src/components/Loading";
import ScrollToEnd from "src/components/ScrollToEnd";
import Typing from "src/components/TypingAnimation";
import { useGetChatsQuery } from "src/services/api/chatApi";
import { setNewChatButtonDisable } from "src/services/slice/chatSlice";

const ChatList = ({ groupId }) => {
  const sendingInput = useSelector((state) => state.loading.sendingInput);
  const dispatch = useDispatch();
  const { data, error, isLoading, isFetching } = useGetChatsQuery(
    { groupId },
    { skip: !groupId }
  );

  useEffect(() => {
    if (data && data.data.length === 0) {
      dispatch(setNewChatButtonDisable({ disable: true }));
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" flex flex-col overflow-y-auto custom-scrolbar">
      {data?.data?.map((item, idx) => (
        <div
          key={item.id}
          className={`flex flex-col ${idx === 0 ? " " : "border-t"} py-4`}
        >
          <div className="w-1/2 self-center py-2">
            <div className="flex flex-col items-start">
              <div className=" flex mb-2 justify-start ">
                <div className="w-min  text-sm font-normal leading-none  flex-initial rounded-r-full  py-1 text-green-700 ">
                  You
                </div>
              </div>
              <div className="relative font-serif  text-lg bg-white  py-2 px-4 shadow-sm rounded-xl border">
                <div>{item.user_input}</div>
              </div>
            </div>
          </div>
          <div className="w-1/2 self-center py-2">
            <div className="flex flex-col items-start">
              <div className=" flex mb-2 justify-start ">
                <div className="w-min  text-sm font-normal leading-none  flex-initial rounded-r-full  py-1  text-yellow-700  ">
                  Chatgpt
                </div>
              </div>
              <div className="relative text-sm bg-white py-2 px-4 shadow-sm rounded-xl border">
                <div
                  className="font-serif text-xl"
                  style={{ whiteSpace: "break-spaces", lineBreak: "auto" }}
                >
                  {/* {item.bot_output} */}

                  {item?.bot_output.split("\n").map((item, key) => {
                    if (item === "") {
                      return null;
                    } else
                      return (
                        <React.Fragment key={key}>
                          {item}
                          <br />
                        </React.Fragment>
                      );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      {sendingInput && (
        <div className="w-1/2 self-center py-2">
          <div className="flex flex-col items-start">
            <div className=" flex mb-2 justify-start ">
              <div className="w-max  text-sm font-normal leading-none  flex-initial   py-1  text-yellow-700  ">
                Chatgpt Typing
              </div>
            </div>
            <div className="relative text-sm bg-white py-3 px-4 shadow-sm rounded-xl border">
              <div
                className="font-serif text-xl"
                style={{ whiteSpace: "break-spaces", lineBreak: "auto" }}
              >
                <Typing />
              </div>
            </div>
          </div>
        </div>
      )}
      <ScrollToEnd data={data} sendingInput={sendingInput} />
    </div>
  );
};

export default ChatList;
