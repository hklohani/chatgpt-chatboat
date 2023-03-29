import React, { useEffect } from "react";
import Loading from "src/components/Loading";
import ScrollToBottomButton from "src/components/ScrollToBottomButton";
import { useGetChatsQuery } from "src/services/api/chatApi";

const ChatList = ({ groupId }) => {
  let messagesEnd;
  let messagesStart;
  const { data, error, isLoading } = useGetChatsQuery(
    { groupId },
    { skip: !groupId }
  );

  const scrollToBottom = () => {
    messagesEnd.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messagesEnd) {
      scrollToBottom();
    }
  }, [data, messagesEnd, groupId]);

  const scrollToStart = () => {
    messagesStart.scrollIntoView({ behavior: "smooth" });
  };
  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className=" flex flex-col overflow-y-auto custom-scrolbar">
      <div
        style={{ float: "left", clear: "both" }}
        ref={(el) => {
          messagesStart = el;
        }}
      />
      {data?.data?.map((item) => (
        <React.Fragment key={item.id}>
          {/* <div className=" border-b flex w-full justify-center p-4">
            <div className="w-1/2  gap-4 self-center  justify-center">
              <div className=" flex mb-2 justify-start ">
                <div className="w-min  text-sm font-normal leading-none  flex-initial rounded-r-full  py-1 text-green-700 ">
                  You
                </div>
              </div>
              <p className="font-serif text-xl">{item.user_input}</p>
            </div>
          </div> */}
          <div class="w-1/2  gap-4 self-center  justify-center py-4">
            <div class="flex flex-col items-start">
              <div className=" flex mb-2 justify-start ">
                <div className="w-min  text-sm font-normal leading-none  flex-initial rounded-r-full  py-1 text-green-700 ">
                  You
                </div>
              </div>
              <div class="relative text-sm bg-white py-2 px-4 shadow rounded-xl">
                <div>{item.user_input}</div>
              </div>
            </div>
          </div>
          <div class="w-1/2  gap-4 self-center  justify-center py-4">
            <div class="flex flex-col items-start">
              <div className=" flex mb-2 justify-start ">
                <div className="w-min  text-sm font-normal leading-none  flex-initial rounded-r-full  py-1  text-yellow-700  ">
                  Chatgpt
                </div>
              </div>
              <div class="relative text-sm bg-white py-2 px-4 shadow rounded-xl">
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
          {/* <div className=" border-b bg-gray-50 flex w-full justify-center p-4">
            <div className="w-1/2  gap-4 self-center  justify-center">
              <div className=" flex mb-2 justify-start ">
                <div className="w-min  text-sm font-normal leading-none  flex-initial rounded-r-full  py-1  text-yellow-700  ">
                  Chatgpt
                </div>
              </div>
              <div
                className="font-serif text-xl"
                style={{ whiteSpace: "break-spaces", lineBreak: "auto" }}
              >
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
          </div> */}
        </React.Fragment>
      ))}
      <div
        style={{ float: "left", clear: "both" }}
        ref={(el) => {
          messagesEnd = el;
        }}
      />
      <button
        onClick={scrollToBottom}
        className="cursor-pointer absolute right-6 bottom-[124px] md:bottom-[120px] z-10 rounded-full border border-gray-200 bg-gray-50 text-gray-600 dark:border-white/10 dark:bg-white/10 dark:text-gray-200"
      >
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="2"
          viewBox="0 0 24 24"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 m-1"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <polyline points="19 12 12 19 5 12"></polyline>
        </svg>
      </button>
    </div>
  );
};

export default ChatList;
