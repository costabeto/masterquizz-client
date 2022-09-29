import { Box, Icon, Stack, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { MdCheckCircle, MdClose } from 'react-icons/md';
import { IRoundResultAnswer } from '../../DTOs';

interface IAnswerProps extends IRoundResultAnswer {
	correctAnswer: string;
}

const Answer = ({
	data: { answer, user, correctAnswer },
}: {
	data: IAnswerProps;
}) => {
	const userName = useMemo(
		() => user[0].toUpperCase() + user.slice(1, user.length),
		[user]
	);

	return (
		<Stack
			bg="whiteAlpha.100"
			borderRadius="3xl"
			p="4"
			direction="row"
			justify="space-between"
			align="center"
		>
			<Text fontSize="xl">{userName}</Text>

			<Stack direction="row" justify="space-between" align="center" w="100px">
				<Text fontSize="3xl" textTransform="uppercase">
					{answer}
				</Text>
				{answer === correctAnswer ? (
					<Box w="40px" h="40px" borderRadius="50%" bg="white">
						<Icon as={MdCheckCircle} color="green.400" fontSize="40" />
					</Box>
				) : (
					<Box w="40px" h="40px" borderRadius="50%" bg="red.300">
						<Icon as={MdClose} color="white" fontSize="40" />
					</Box>
				)}
			</Stack>
		</Stack>
	);
};

export default Answer;
