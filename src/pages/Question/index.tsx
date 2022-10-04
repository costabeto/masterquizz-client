import { Button, RadioGroup, Stack, Text } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { IRound } from '../../DTOs';
import { useSocket } from '../../hooks/useSocket';
import Answer from './Answer';

interface IQuestion {
	currentRound: IRound;
}

const Question = ({ currentRound }: IQuestion) => {
	const { user, socket } = useSocket();
	const [result, setResult] = useState('');

	const [isSubmited, setIsSubmited] = useState(false);

	const handleSubmit = () => {
		if (!user) return;
		const answer = {
			user: user.id,
			name: user.name,
			answer: result,
		};
		socket.emit('answer', answer);
		setIsSubmited(true);
	};

	const options = useMemo(
		() =>
			Object.keys(currentRound.options).map((k) => ({
				answer: k,
				text: currentRound.options[k],
			})),
		[currentRound.options]
	);

	return (
		<Stack
			w="100%"
			maxW="900px"
			direction="column"
			justify="flex-start"
			align="center"
			spacing="8"
		>
			<Text fontSize="2xl" fontWeight="600" textAlign="center">
				{currentRound.question}
			</Text>

			<RadioGroup onChange={setResult} value={result} w="100%" maxW="600px">
				<Stack
					direction="column"
					justify="flex-start"
					align="flex-start"
					spacing="2"
					w="100%"
				>
					{options.map((option) => (
						<Answer option={option} key={option.answer} disabled={isSubmited} />
					))}
				</Stack>
			</RadioGroup>

			<Button
				size="lg"
				w="100%"
				maxW="600px"
				disabled={isSubmited}
				onClick={handleSubmit}
			>
				Confirmar
			</Button>
		</Stack>
	);
};

export default Question;
