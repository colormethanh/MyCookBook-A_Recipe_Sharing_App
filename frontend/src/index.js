import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import backgroundimg from './recipeComponents/images/backgroundimg.jpg'

// components
import NavBar from './recipeComponents/navbar';
import RecipeCreateContainer from './recipeComponents/recipeCreate';
import RecipeContainer from './recipeComponents/recipeContainer';
import RecipeListContainer from './recipeComponents/recipeList';
import HomePage from './recipeComponents/home'

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
[
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/RecipeDetail",
    element: <RecipeContainer />,
  },
  {
    path: "/RecipeCreate",
    element: <RecipeCreateContainer />
  },
  {
    path:"/RecipeList",
    element: <RecipeListContainer />
  }
]);


root.render(
  <React.StrictMode>
      <RouterProvider router={router} />  
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
