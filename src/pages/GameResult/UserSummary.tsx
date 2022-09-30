import { Progress, Stack, Text } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { IGameResult, IGameResultAnswer } from '../../DTOs';

interface IGameResultList {
	id: string;
	user: string;
	correctAnswers: IGameResultAnswer[];
}
const UserSummary = ({
	userData: { user, correctAnswers },
	results,
}: {
	userData: IGameResultList;
	results: IGameResult[];
}) => {
	const correctAnswerProportion = useMemo(
		() => Math.floor((correctAnswers.length / results.length) * 100),
		[correctAnswers.length, results.length]
	);

	const userName = useMemo(
		() => user[0].toUpperCase() + user.slice(1, user.length),
		[user]
	);

	return (
		<Stack
			w="100%"
			maxW="500px"
			direction="row"
			justify="space-between"
			align="center"
			bg="whiteAlpha.100"
			borderRadius="20px"
			p="4"
		>
			<Text fontSize="2xl" fontWeight="600">
				{userName}
			</Text>

			<Stack w="60%" direction="row" justify="flex-end" align="center">
				<Progress
					colorScheme="green"
					w="100%"
					height="32px"
					value={correctAnswerProportion}
				/>

				<Text w="80px" fontSize="xl" fontWeight="600">
					{correctAnswers.length} / {results.length}
				</Text>
			</Stack>
		</Stack>
	);
};

export default UserSummary;
