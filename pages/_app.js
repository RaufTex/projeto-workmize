import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from '../src/contexts/AuthContext';

import apolloClient from '../src/services/apollo-client';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
