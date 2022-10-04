import { Box, Radio, Text } from '@chakra-ui/react';

interface IAnswerProps {
	option: {
		answer: string;
		text: string;
	};
	disabled: boolean;
}

const Answer = ({ option, disabled = false }: IAnswerProps) => (
	<Box bg="whiteAlpha.100" p="2" borderRadius="xl" w="100%">
		<Radio w="100%" size="lg" value={option.answer} disabled={disabled}>
			<Text w="100%" fontSize="2xl" fontWeight="300" fontStyle="italic">
				{option.text}
			</Text>
		</Radio>
	</Box>
);

export default Answer;
