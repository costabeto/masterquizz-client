import Question from './pages/Question';
import { useSocket } from './hooks/useSocket';
import Lobby from './pages/Lobby';
import RoundResult from './pages/RoundResult';

const Home = () => {
	const { currentRound, roundResult } = useSocket();

	if (roundResult) {
		return <RoundResult result={roundResult} />;
	}
	if (currentRound) {
		return <Question currentRound={currentRound} />;
	}

	return <Lobby />;
};

export default Home;
