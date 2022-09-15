import { Flex, Input, Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://127.0.0.1:5000');

interface IUser {
  name: string;
  id: string;
}

const Home = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [name, setName] = useState('');
  const [userList, setUserList] = useState<IUser[]>([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('registered', (arg) => {
      setName(arg.name);
    });

    socket.on('clients', (arg) => {
      setUserList(arg);
    });

    socket.on('disconnect', () => {
      console.log('disconnect');
      setIsConnected(false);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const handleRename = () => {
    socket.emit('rename', { name });
  };

  return (
    <Flex direction='column' justify='flex-start' align='center' w='100%'>
      <Stack w='300px' direction='column' spacing='4'>
        <Text>HOME</Text>
        {isConnected ? <h1>Connected</h1> : <h1>Disconnected</h1>}

        <Input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Informe seu nome...'
        />
        <button onClick={() => handleRename()}>Mudar apelido</button>

        <Text>Usuários online</Text>
        {userList.map((u) => (
          <Text key={u.id}>{u.name}</Text>
        ))}
      </Stack>
    </Flex>
  );
};

export default Home;
