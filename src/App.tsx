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
    <>
      <h1>HOME</h1>
      {isConnected ? <h1>Connected</h1> : <h1>Disconnected</h1>}

      <input
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='Informe seu nome...'
      />
      <button onClick={() => handleRename()}>Mudar apelido</button>

      <h2>Usuários online</h2>
      {userList.map((u) => (
        <p key={u.id}>{u.name}</p>
      ))}
    </>
  );
};

export default Home;
