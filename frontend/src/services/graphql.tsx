import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://www.lightgreen-porcupine-187566.hostingersite.com/graphql",
  cache: new InMemoryCache(),
});

export default client;
