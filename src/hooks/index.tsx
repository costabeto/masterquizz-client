import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from '../styles/theme';
import { SocketProvider } from './useSocket';

interface IAppProviderProps {
  children: ReactNode;
}

const AppProvider = ({ children }: IAppProviderProps) => {
  return (
    <ChakraProvider theme={theme}>
      <SocketProvider>{children}</SocketProvider>
    </ChakraProvider>
  );
};

export default AppProvider;
