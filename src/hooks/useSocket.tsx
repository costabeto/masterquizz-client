import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useToast } from '@chakra-ui/react';
import { v4 } from 'uuid';
import { io, Socket } from 'socket.io-client';
import { faker } from '@faker-js/faker';

interface IUser {
  name: string;
  id: string;
}

interface ISocketProviderProps {
  children: ReactNode;
}

interface SocketContextData {
  user: IUser | null;
  socket: Socket;
  isConnected: boolean;
  userList: IUser[];
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

const SocketProvider = ({ children }: ISocketProviderProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [user] = useState<IUser>(() => {
    const localUser = localStorage.getItem('@mq-user');

    if (!localUser) {
      const newUser = {
        id: v4(),
        name: faker.animal.type(),
      };

      localStorage.setItem('@mq-user', JSON.stringify(newUser));

      return newUser;
    }

    return JSON.parse(localUser) as IUser;
  });

  const [userList, setUserList] = useState<IUser[]>([]);

  const toast = useToast({
    position: 'top-right',
  });

  const [socket] = useState(() => {
    const socketHost = String(process.env.REACT_APP_SOCKET_URL);

    const socketInstace = io(socketHost, {
      auth: {
        user,
      },
    });

    return socketInstace;
  });

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      toast({
        title: 'Você está online',
        status: 'success',
      });
    });

    socket.on('client-list', (arg: IUser[]) => {
      console.log('arg', arg);
      setUserList(arg);
    });

    socket.on('disconnect', () => {
      toast({
        title: 'Você está offline',
        status: 'error',
      });
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, [socket, toast]);

  return (
    <SocketContext.Provider value={{ socket, isConnected, user, userList }}>
      {children}
    </SocketContext.Provider>
  );
};

function useSocket(): SocketContextData {
  const context = useContext(SocketContext);

  return context;
}

export { SocketProvider, useSocket };
