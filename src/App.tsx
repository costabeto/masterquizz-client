import Question from './pages/Question';
import { useSocket } from './hooks/useSocket';
import Lobby from './pages/Lobby';

const Home = () => {
	const { currentRound } = useSocket();

	if (currentRound) {
		return <Question currentRound={currentRound} />;
	}

	return <Lobby />;
};

export default Home;
