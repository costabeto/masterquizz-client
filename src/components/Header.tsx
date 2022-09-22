import { Flex, Icon, keyframes, Stack, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { MdVideogameAsset, MdVideogameAssetOff } from 'react-icons/md';
import { useSocket } from '../hooks/useSocket';

const animationKeyframes = keyframes`
  0% { transform: scale(1) }
  25% { transform: scale(1.2) }
  50% { transform: scale(1.2) }
  100% { transform: scale(1) }
`;

const animation = `${animationKeyframes} 0.5s ease-in-out infinite`;

const Header = () => {
  const { user, isConnected } = useSocket();

  const userName = useMemo(
    () =>
      user
        ? user.name[0].toUpperCase() + user.name.slice(1, user.name.length)
        : '--',
    [user]
  );

  return (
    <Stack
      w='100%'
      h='100px'
      direction='row'
      justify='space-between'
      align='center'
      bg='pink.600'
      p={['4', '4', '8']}
    >
      <Text
        fontWeight='900'
        fontStyle='italic'
        fontSize={['3xl', '4xl', '5xl', '6xl']}
        textShadow='0 1px 0 #CCCCCC, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9, 0 5px 0 #aaa, 0 6px 1px rgba(0,0,0,.1), 0 0 5px rgba(0,0,0,.1), 0 1px 3px rgba(0,0,0,.3), 0 3px 5px rgba(0,0,0,.2), 0 5px 10px rgba(0,0,0,.25), 0 10px 10px rgba(0,0,0,.2), 0 20px 20px rgba(0,0,0,.15)'
      >
        MasterQuizz
      </Text>

      <Stack spacing='4' direction='row' justify='space-between' align='center'>
        <Text
          fontStyle='italic'
          fontSize={['2xl', '3xl', '4xl', '5xl']}
          fontWeight='bold'
          textShadow='3px 3px 7px rgba(206,206,206,0.56)'
        >
          {userName}
        </Text>

        {isConnected ? (
          <Flex
            bg='green.500'
            borderRadius='full'
            w='12'
            h='12'
            direction='column'
            justify='center'
            align='center'
            border='1px solid rgba(255,255,255,0.6)'
          >
            <Icon as={MdVideogameAsset} fontSize='4xl' color='white' />
          </Flex>
        ) : (
          <Flex
            as={motion.div}
            animation={animation}
            bg='red.500'
            borderRadius='full'
            w='12'
            h='12'
            direction='column'
            justify='center'
            align='center'
            border='1px solid rgba(255,255,255,0.6)'
          >
            <Icon as={MdVideogameAssetOff} fontSize='4xl' color='white' />
          </Flex>
        )}
      </Stack>
    </Stack>
  );
};

export default Header;
