import { Stack, Text } from '@chakra-ui/react';
import { useSocket } from './hooks/useSocket';

const Home = () => {
  const { user, isConnected, userList } = useSocket();

  return (
    <Stack
      w='100%'
      maxW='600px'
      direction='column'
      justify='flex-start'
      align='center'
      spacing='4'
    >
      <Text fontSize='2xl' fontWeight='600' textAlign='center'>
        Bem-vinde ao jogo mais top da minha rua!
      </Text>

      {isConnected ? <h1>Connected</h1> : <h1>Disconnected</h1>}

      <Text fontSize='2xl' fontWeight='600' textAlign='center'>
        Seu nome é {user && user.name}
      </Text>

      {/* <Input type='text' value={user && user.name} placeholder='Informe seu nome...' /> */}

      <Text>Usuários online</Text>
      {userList.map((u) => (
        <Text key={u.id}>{u.name}</Text>
      ))}
    </Stack>
  );
};

export default Home;
