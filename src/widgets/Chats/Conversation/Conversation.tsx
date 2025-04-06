import ChatHeader from "./ChatHeader";
import Message from "./Message";
import MessageBar from "./MessageBar";

export default function Chat() {
  return (
    <>
      <div className="fixed top-0 h-[100vh] w-full bg-white flex flex-col md:static md:flex-1">
        <ChatHeader />
        <Message />
        <MessageBar />
      </div>
    </>
  );
}
