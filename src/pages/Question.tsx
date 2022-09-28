import { Flex, Radio, RadioGroup, Stack, Text, Button } from '@chakra-ui/react';
import { useMemo, useState } from 'react';
import { IRound } from '../DTOs';
import { useSocket } from '../hooks/useSocket';

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
      answer: result,
    };
    socket.emit('answer', answer);
    setIsSubmited(true);
  };

  const options = useMemo(() => {
    return Object.keys(currentRound.options).map((k) => ({
      answer: k,
      text: currentRound.options[k],
    }));
  }, [currentRound.options]);

  return (
    <Flex w='100%' h='fit-content' direction='column' align='center'>
      <Text w={'100%'}>{currentRound.question}</Text>

      <RadioGroup onChange={setResult} value={result}>
        <Stack direction='column'>
          {options.map((option) => (
            <Radio size='lg' disabled={isSubmited} value={option.answer}>
              {option.text}
            </Radio>
          ))}
        </Stack>
      </RadioGroup>

      <Button disabled={isSubmited} onClick={handleSubmit}>
        Enviar
      </Button>
    </Flex>
  );
};

export default Question;
