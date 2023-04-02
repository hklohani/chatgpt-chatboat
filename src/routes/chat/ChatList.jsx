import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from 'src/components/Loading';
import ScrollToEnd from 'src/components/ScrollToEnd';
import Typing from 'src/components/TypingAnimation';
import { useGetChatsQuery } from 'src/services/api/chatApi';

const ChatList = ({ groupId }) => {
  const sendingInput = useSelector((state) => state.loading.sendingInput);
  const { data, error, isLoading, isFetching } = useGetChatsQuery({ groupId }, { skip: !groupId });

  if (isLoading) {
    return <Loading size="md" />;
  }

  if (data?.data?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-2xl font-semibold text-gray-500">No messages yet</div>
        <div className="text-lg font-semibold text-gray-500">Start a conversation</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col overflow-y-auto custom-scrolbar lg:pb-30 pb-20  pt-14 lg:pt-0">
      {data?.data?.map((item, idx) => (
        <div key={item.id} className={`flex flex-col ${idx === 0 ? ' ' : 'border-t'} py-4`}>
          <div className="w-full p-4 lg:p-0 lg:w-1/2 self-center py-2">
            <div className="flex flex-col items-end">
              <div className=" flex mb-2 justify-end ">
                <div className="w-min  text-lg font-normal leading-none  flex-initial rounded-r-full  py-1 text-green-700 ">
                  You
                </div>
              </div>
              <div className="relative whitespace-break-spaces tracking-wide font-serif text-md lg:text-xl bg-white py-2 px-4 shadow-sm rounded-xl border">
                <div>{item.user_input}</div>
              </div>
            </div>
          </div>
          <div className="w-full p-4 lg:p-0 lg:w-1/2 self-center py-2">
            <div className="flex flex-col items-start">
              <div className=" flex my-2 justify-start ">
                <div className="w-min  text-lg font-normal leading-none  flex-initial rounded-r-full  py-1  text-yellow-700  ">
                  Chatgpt
                </div>
              </div>
              <div className="relative whitespace-break-spaces tracking-wide font-serif text-md lg:text-xl bg-white py-2 px-4 shadow-sm rounded-xl border">
                {item?.bot_output.split('\n').map((item, key) => {
                  if (item === '') {
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
      ))}
      {sendingInput && (
        <div className="self-center w-full lg:w-1/2 pb-4 pl-4 lg:pl-0">
          <div className="flex flex-col items-start">
            <div className=" flex mb-2 justify-start ">
              <div className="w-max  text-lg font-normal leading-none flex-initial py-1 text-yellow-700">
                Chatgpt Typing
              </div>
            </div>
            <div className="relative text-sm bg-white py-3 px-4 shadow-sm rounded-xl border">
              <Typing />
            </div>
          </div>
        </div>
      )}
      <div className="lg:block  hidden">
        <ScrollToEnd data={data} sendingInput={sendingInput} />
      </div>
    </div>
  );
};

export default ChatList;
