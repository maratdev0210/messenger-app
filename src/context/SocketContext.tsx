import { useAppStore } from "@/store/store";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";
import { useState } from "react";

type ISocketContextType = Socket | null;
const SocketContext = createContext<ISocketContextType>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

interface ISocketProvider {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: ISocketProvider) => {
  // const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
  //   null
  // );
  const [socket, setSocket] = useState<Socket | null>(null);
  const { userInfo, selectedChatType, selectedChatData, addMessage } =
    useAppStore();

  useEffect(() => {
    if (userInfo) {
      const newSocket = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      newSocket.on("connect", () => {
        console.log("Connected to socket server");
      });

      newSocket.on("receiveMessage", (message) => {
        if (
          (selectedChatType !== undefined &&
            selectedChatData._id === message.sender._id) ||
          selectedChatData._id === message.recipient._id
        ) {
          console.log("message received: ", message);
          addMessage(message);
        }
      });

      setSocket(newSocket);

      return () => {
        newSocket.disconnect();
      };
    }
  }, [userInfo, selectedChatType, selectedChatData]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
