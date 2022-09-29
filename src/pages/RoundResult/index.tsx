import { Flex, Stack, Text } from '@chakra-ui/react';
import { IRoundResult } from '../../DTOs';
import Answer from './Answer';

const RoundResult = ({ result }: { result: IRoundResult }) => (
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
			{result.answers.map(({ answer, user }) => (
				<Answer data={{ answer, user, correctAnswer: result.correctAnswer }} />
			))}
		</Stack>
	</Stack>
);

export default RoundResult;
