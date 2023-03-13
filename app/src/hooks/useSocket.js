import { useMemo, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Manager } from "socket.io-client";

export const useSocket = (serverPath) => {
  const { userToken } = useSelector((state) => state.auth);
  const manager = useMemo(
    () =>
      new Manager(`http://192.168.0.2:8080/bus-tracking/socket.io.js`, {
        path: "/bus-tracking",
        extraHeaders: {
          holaMundo: "mundo",
          dataConnection: userToken,
        },
      }),
    [serverPath]
  );

  const socket = useMemo(() => manager.socket("/"), [serverPath]);

  const [online, setOnline] = useState(false);
  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return {
    socket,
    online,
  };
};
