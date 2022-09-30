import Question from './pages/Question';
import { useSocket } from './hooks/useSocket';
import Lobby from './pages/Lobby';
import RoundResult from './pages/RoundResult';
import GameResult from './pages/GameResult';

const Home = () => {
	const { currentRound, roundResult, gameResult } = useSocket();

	if (gameResult) {
		return <GameResult result={gameResult} />;
	}

	if (roundResult) {
		return <RoundResult result={roundResult} />;
	}

	if (currentRound) {
		return <Question currentRound={currentRound} />;
	}

	return <Lobby />;
};

export default Home;
