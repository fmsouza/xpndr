import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "./client";
import { Routes } from "./routes";
import { useAuth } from "./modules/auth/hooks";

export const App = () => {
  const {accessToken} = useAuth();
  const client = createApolloClient(accessToken); 

  return (
    <ApolloProvider client={client}>
      <Routes />
    </ApolloProvider>
  );
};