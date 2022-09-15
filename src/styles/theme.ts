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
    colorScheme: 'purple',
  }),
  {
    fonts: {
      heading: 'Roboto',
      body: 'Roboto',
    },
    styles: {
      global: {
        '*': {
          boxSizing: 'border-box',
        },
        'html, body': {
          bg: 'gray.700',
          color: 'gray.200',
          fontWeight: 300,
        },
      },
    },
  }
);
