import { Stack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { IGameResult, IGameResultAnswer } from '../../DTOs';
import UserSummary from './UserSummary';

interface IGameResultList {
	id: string;
	user: string;
	correctAnswers: IGameResultAnswer[];
}

const GameResult = ({ result }: { result: IGameResult[] }) => {
	const summaryByUser = useMemo(() => {
		const answersByUser = result.reduce((acc, curr) => {
			curr.answers.forEach((an) => {
				const existentUser = acc.find((u) => u.id === an.user);

				const isQuestionCorrect = curr.correctAnswer === an.answer;

				if (!existentUser) {
					acc.push({
						id: an.user,
						user: an.name,
						correctAnswers: isQuestionCorrect ? [an] : [],
					});
				} else if (isQuestionCorrect) {
					const newUser = existentUser;

					const index = acc.indexOf(newUser);

					newUser.correctAnswers.push(an);

					acc.splice(index, 1, newUser);
				}
			});

			return acc;
		}, [] as IGameResultList[]);

		return answersByUser.sort(
			(a, b) => b.correctAnswers.length - a.correctAnswers.length
		);
	}, [result]);

	return (
		<Stack
			w="100%"
			h="100%"
			maxW="900px"
			direction="column"
			justify="flex-start"
			align="center"
			spacing="8"
			overflowY="auto"
		>
			<Text fontSize="3xl" fontWeight="800">
				Fim do Jogo
			</Text>

			<Stack
				w="100%"
				direction="column"
				justify="flex-start"
				align="center"
				spacing="4"
			>
				{summaryByUser.map((i) => (
					<UserSummary key={i.id} userData={i} results={result} />
				))}
			</Stack>
		</Stack>
	);
};

export default GameResult;
