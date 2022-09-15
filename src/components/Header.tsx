import { Stack, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Stack
      w='100%'
      h='100px'
      direction='row'
      justify='center'
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

      {/* <Text fontWeight='900' fontStyle='italic' fontSize='2xl'>
        <Icon as={FiWifi} fontSize='4xl' />
      </Text> */}
    </Stack>
  );
};

export default Header;
