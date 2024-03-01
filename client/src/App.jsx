import { Outlet } from "react-router-dom";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="min-h-screen flex flex-col md:grid md:grid-rows-[auto,1fr,auto] md:grid-cols-[auto,1fr,auto] rounded-lg overflow-hidden">
        <div className="row-span-1 md:row-span-2 md:col-span-1">
          <Header />
        </div>
        <div className="md:row-span-2 md:col-span-2">
          <Outlet />
        </div>
        <div className="md:row-span-3 md:col-span-3">
          <Footer />
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
