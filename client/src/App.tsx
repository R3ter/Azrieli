import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/LoginPage";
import ChakraTheme from "@chakra-ui/theme";
import SignUp from "./Pages/SignUp";
import NavBar from "./Pages/NavBar";
import HomePage from "./Pages/HomePage";
import SearchComp from "./Pages/SearchComp";
import AddMovie from "./Pages/AddMovie";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

function App() {
  const client = new ApolloClient({
    uri: "http://localhost:4000/graphql",
    cache: new InMemoryCache(),
  });
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar />,
      children: [
        {
          path: "/Login",
          element: <LoginPage />,
        },
        {
          path: "/SignUp",
          element: <SignUp />,
        },
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/SearchComp",
          element: <SearchComp />,
        },
        {
          path: "/AddMovie",
          element: <AddMovie />,
        },
      ],
    },
  ]);
  return (
    <ChakraProvider theme={ChakraTheme}>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </ChakraProvider>
  );
}
export default App;
