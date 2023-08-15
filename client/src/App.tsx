import * as React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import LoginPage from "./Pages/LoginPage";
import ChakraTheme from "@chakra-ui/theme";
import SignUp from "./Pages/SignUp";
import NavBar from "./Pages/NavBar";
import HomePage from "./Pages/HomePage";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";
import SearchComp from "./components/SearchComp";
import Members from "./Pages/Members";

function App() {
  const client = new ApolloClient({
    uri: "https://movies-dashboard.onrender.com/graphql",
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
          path: "/members",
          element: <Members />,
        },
        {
          path: "/subscriptions",
          element: <HomePage />,
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
