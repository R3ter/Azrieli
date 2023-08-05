import * as React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ChakraProvider} from '@chakra-ui/react'
import LoginPage from './Pages/LoginPage';
import ChakraTheme from '@chakra-ui/theme';
import SignUp from './Pages/SignUp';
import NavBar from './Pages/NavBar'
import HomePage from './Pages/HomePage';
import Comp from './Pages/Comp';
import SearchComp from './Pages/SearchComp';
import AddMovie from './Pages/AddMovie';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <NavBar/>,
      children:[
        {
          path: "/Login",
          element: <LoginPage/>,
        },
        {
          path: "/SignUp",
          element: <SignUp/>,
        },
        {
          path: "/HomePage",
          element: <HomePage/>,
        },
        {
          path: "/Comp",
          element: <Comp/>,
        },
        {
          path: "/SearchComp",
          element: <SearchComp/>,
        },
        {
          path: "/AddMovie",
          element: <AddMovie/>,
        },
      ]
    },
    
  ]);
  return (
    <ChakraProvider theme={ChakraTheme}>
      <RouterProvider router={router} />
    </ChakraProvider>
    
  )
}
export default App;