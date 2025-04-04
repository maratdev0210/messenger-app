import { useAppStore } from "@/store/store";
import { HOST } from "@/utils/constants";
import { io } from "socket.io-client";
import { createContext, useContext, useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { DefaultEventsMap } from "@socket.io/component-emitter";

type ISocketContextType = Socket | null;
const SocketContext = createContext<ISocketContextType>(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

interface ISocketProvider {
  children: React.ReactNode;
}

export const SocketProvider = ({ children }: ISocketProvider) => {
  const socketRef = useRef<Socket<DefaultEventsMap, DefaultEventsMap> | null>(
    null
  );
  const { userInfo } = useAppStore();

  useEffect(() => {
    if (userInfo) {
      socketRef.current = io(HOST, {
        withCredentials: true,
        query: { userId: userInfo.id },
      });
      socketRef.current.on("connect", () => {
        console.log("Connected to socket server");
      });

      return () => {
        socketRef.current.disconnect();
      };
    }
  }, [userInfo]);

  return (
    <SocketContext.Provider value={socketRef.current}>
      {children}
    </SocketContext.Provider>
  );
};
