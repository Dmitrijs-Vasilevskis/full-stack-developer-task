import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://scandiweb-test.42web.io//graphql",
  cache: new InMemoryCache(),
});

export default client;
