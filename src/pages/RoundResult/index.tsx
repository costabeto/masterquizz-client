import { Button, Flex, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { IRoundResult, IRoundResultAnswer } from '../../DTOs';
import { useSocket } from '../../hooks/useSocket';
import Answer from './Answer';

const RoundResult = ({ result }: { result: IRoundResult }) => {
	const [isConfirmed, setConfirmed] = useState(false);

	const { socket, user } = useSocket();

	const sortedAnswers = useMemo(() => {
		const orderAlphabetically = (
			a: IRoundResultAnswer,
			b: IRoundResultAnswer
		) => {
			if (a.name > b.name) return 1;
			if (b.name > a.name) return -1;
			return 0;
		};

		const right = result.answers
			.filter((a) => a.answer === result.correctAnswer)
			.sort(orderAlphabetically);

		const wrong = result.answers
			.filter((a) => a.answer !== result.correctAnswer)
			.sort(orderAlphabetically);

		return right.concat(wrong);
	}, [result.answers, result.correctAnswer]);

	function handleConfirm() {
		if (user) {
			socket.emit('continue', { id: user.id });
			setConfirmed(true);
		}
	}

	return (
		<Stack
			w="100%"
			maxW="900px"
			direction="column"
			justify="flex-start"
			align="center"
			spacing="8"
		>
			<Text fontSize="3xl" fontWeight="800">
				Resultados da rodada {result.round + 1}
			</Text>

			<Text fontSize="2xl">{result.question}</Text>

			<Stack direction="row" w="100%" justify="center" align="center">
				<Text fontSize="2xl" fontWeight="500" mr="8">
					Resposta
				</Text>

				<Flex
					w="100px"
					h="50px"
					bg="pink.500"
					direction="column"
					align="center"
					justify="center"
					borderRadius="2xl"
				>
					<Text fontSize="4xl" fontWeight="black" textTransform="uppercase">
						{result.correctAnswer}
					</Text>
				</Flex>
			</Stack>

			<Text fontSize="2xl" fontWeight="500" mr="8">
				Resultado
			</Text>

			<Stack spacing="4" w="100%" maxW="300px">
				{sortedAnswers.map((anwer) => (
					<Answer
						key={anwer.user}
						data={{ ...anwer, correctAnswer: result.correctAnswer }}
					/>
				))}
			</Stack>

			<Button size="lg" disabled={isConfirmed} onClick={() => handleConfirm()}>
				Continuar
			</Button>
		</Stack>
	);
};

export default RoundResult;
