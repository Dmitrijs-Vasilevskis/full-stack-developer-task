import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL =
  "https://cors-anywhere.herokuapp.com/http://scandiweb-test.42web.io/graphql";
  
const client = new ApolloClient({
  uri: API_URL,
  cache: new InMemoryCache(),
});

export default client;
