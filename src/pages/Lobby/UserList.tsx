import { Avatar, Stack, Tag, TagLabel, Text } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useSocket } from '../../hooks/useSocket';

const UserList = () => {
	const { userList, user } = useSocket();

	const users = useMemo(
		() =>
			userList.map(({ id, name }) => {
				if (user && user.name === name) {
					return {
						id,
						name,
						label: `${
							name[0].toUpperCase() + name.slice(1, name.length)
						} (você)`,
					};
				}

				return {
					id,
					name,
					label: name[0].toUpperCase() + name.slice(1, name.length),
				};
			}),
		[user, userList]
	);

	return (
		<Stack
			w="100%"
			maxW="300px"
			direction="column"
			justify="flex-start"
			align="flex-start"
			border="1px solid rgba(255,255,255,0.4)"
			borderRadius="2xl"
			p="4"
		>
			<Text fontWeight="semibold" fontSize="3xl">
				Usuários online
			</Text>

			<Stack>
				{users.map((u) => (
					<Tag size="lg" borderRadius="full" key={u.id}>
						<Avatar size="xs" name={u.name} ml={-1} mr={2} />
						<TagLabel fontSize="2xl">{u.label}</TagLabel>
					</Tag>
				))}
			</Stack>
		</Stack>
	);
};

export default UserList;
