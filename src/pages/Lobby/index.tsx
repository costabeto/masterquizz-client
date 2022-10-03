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
			Bem-vinde ao quiz mais top da minha rua!
		</Text>

		<Stack
			w="100%"
			h="100%"
			flex="1"
			direction="row"
			justify="space-evenly"
			align="flex-start"
			wrap="wrap"
			spacing="2"
			gap="4"
		>
			<Stack maxW="450px" spacing="4">
				<Text fontSize="2xl" fontWeight="600" textAlign="center">
					Instruções do jogo
				</Text>
				<Text fontSize="xl" fontWeight="400" textAlign="center">
					O jogo irá iniciar assim que o dono da sala definir.
				</Text>
				<Text fontSize="xl" fontWeight="400" textAlign="center">
					As perguntas serão de múltipla escolha.
				</Text>
				<Text fontSize="xl" fontWeight="400" textAlign="center">
					Serão 10 perguntas no total.
				</Text>
				<Text fontSize="xl" fontWeight="400" textAlign="center">
					Ao final do jogo você poderá ver os resultados.
				</Text>
			</Stack>

			<UserList />
		</Stack>
	</Stack>
);

export default Lobby;
