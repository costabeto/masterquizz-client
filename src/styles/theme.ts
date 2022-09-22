import {
  extendTheme,
  withDefaultColorScheme,
  withDefaultVariant,
} from '@chakra-ui/react';

export const theme = extendTheme(
  withDefaultVariant({
    variant: 'solid',
  }),
  withDefaultColorScheme({
    colorScheme: 'pink',
  }),
  {
    fonts: {
      heading: 'Roboto, sans-serif',
      body: 'Roboto, sans-serif',
    },
    styles: {
      global: {
        '*': {
          boxSizing: 'border-box',
        },
        'html, body': {
          bg: 'pink.600',
          color: 'gray.200',
          fontWeight: 300,
        },
        input: {
          color: 'gray.600',
        },
      },
    },
  }
);
