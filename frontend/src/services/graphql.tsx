import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL =
  "https://lightgreen-porcupine-187566.hostingersite.com/graphql/";

const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache()
});

export default client;
