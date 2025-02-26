import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://violet-hawk-940965.hostingersite.com/graphql",
  cache: new InMemoryCache(),
});

export default client;
