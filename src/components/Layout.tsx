import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import Header from './Header';

interface ILayoutProps {
	children: ReactNode;
}

const Layout = ({ children }: ILayoutProps) => (
	<Flex
		direction="column"
		justify="space-between"
		align="center"
		w="100vw"
		h="100vh"
	>
		<Header />
		<Flex
			direction="column"
			justify="flex-start"
			align="center"
			w="100%"
			h="100%"
			bg="gray.800"
			borderRadius="24px 24px 0px 0px"
			p="4"
		>
			{children}
		</Flex>
	</Flex>
);

export default Layout;
