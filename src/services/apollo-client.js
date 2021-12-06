import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
  onError,
} from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://hiring-api.workmize.com/graphql',
  cache: new InMemoryCache(),
});

export default client;
