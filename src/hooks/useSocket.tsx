import { useToast } from '@chakra-ui/react';
import { faker } from '@faker-js/faker';
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { io, Socket } from 'socket.io-client';
import { v4 } from 'uuid';
import { IRound, IRoundResult, IUser } from '../DTOs';

interface ISocketProviderProps {
	children: ReactNode;
}

interface SocketContextData {
	user: IUser | null;
	socket: Socket;
	isConnected: boolean;
	userList: IUser[];
	currentRound: IRound | null;
	roundResult: IRoundResult | null;
	gameResult: IRoundResult[] | null;
}

const SocketContext = createContext<SocketContextData>({} as SocketContextData);

const SocketProvider = ({ children }: ISocketProviderProps) => {
	const [isConnected, setIsConnected] = useState(false);
	const [currentRound, setCurrentRound] = useState<IRound | null>({
		question: 'Funcionou?',
		options: {
			a: 'Sim',
			b: 'Não',
			c: 'Talvez',
			d: 'Depende',
			e: 'Dev',
		},
	});
	const [roundResult, setRoundResult] = useState<IRoundResult | null>(null);
	const [gameResult, setGameResult] = useState<IRoundResult[] | null>(null);
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
		position: 'top-left',
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
			setUserList(arg);
		});

		socket.on('begin-round', (arg: IRound) => {
			setCurrentRound(arg);
		});

		socket.on('round-result', (arg: IRoundResult) => {
			setRoundResult(arg);
		});

		socket.on('game-result', (arg: IRoundResult[]) => {
			setGameResult(arg);
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
			socket.off('client-list');
			socket.off('begin-round');
			socket.off('round-result');
			socket.off('game-result');
			socket.off('disconnect');
			socket.off('pong');
		};
	}, [socket, toast]);

	const value = useMemo(
		() => ({
			gameResult,
			roundResult,
			currentRound,
			socket,
			isConnected,
			user,
			userList,
		}),
		[currentRound, gameResult, isConnected, roundResult, socket, user, userList]
	);

	return (
		<SocketContext.Provider value={value}>{children}</SocketContext.Provider>
	);
};

function useSocket(): SocketContextData {
	const context = useContext(SocketContext);

	return context;
}

export { SocketProvider, useSocket };
