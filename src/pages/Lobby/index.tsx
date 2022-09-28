import { Stack, Text } from '@chakra-ui/react';
import UserList from './UserList';

const Lobby = () => (
	<Stack
		w="100%"
		maxW="900px"
		direction="column"
		justify="flex-start"
		align="center"
		spacing="4"
	>
		<Text fontSize="4xl" fontWeight="600" textAlign="center">
			Bem-vinde ao jogo mais top da minha rua!
		</Text>

		<Stack
			w="100%"
			h="100%"
			flex="1"
			direction="row"
			justify="space-evenly"
			align="center"
			wrap="wrap-reverse"
			spacing="2"
			gap="2"
		>
			<Stack minW="300px">
				<Text fontSize="2xl" fontWeight="600" textAlign="center">
					Instruções do jogo
				</Text>
				<Text fontSize="xl" fontWeight="400" textAlign="center">
					Fugiat irure aliqua eu proident pariatur consectetur velit.
				</Text>
				<Text fontSize="xl" fontWeight="400" textAlign="center">
					Fugiat irure aliqua eu proident pariatur consectetur velit.
				</Text>
				<Text fontSize="xl" fontWeight="400" textAlign="center">
					Fugiat irure aliqua eu proident pariatur consectetur velit.
				</Text>
			</Stack>

			<UserList />
		</Stack>
	</Stack>
);

export default Lobby;
