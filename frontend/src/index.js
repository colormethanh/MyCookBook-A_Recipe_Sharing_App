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

// components
import RecipeCreateContainer from './recipeComponents/recipeCreate';
import RecipeContainer, {recipeLoader} from './recipeComponents/recipeContainer';
import RecipeListContainer, {listLoader} from './recipeComponents/recipeList';
import HomePage, { homeLoader } from './recipeComponents/home'


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter(
[
  {
    path: "/",
    element: <HomePage />,
    loader: homeLoader
  },
  {
    path: "/:id",
    element: <RecipeContainer />,
    loader: recipeLoader
  },
  {
    path: "/RecipeCreate",
    element: <RecipeCreateContainer />
  },
  {
    path:"/RecipeList",
    element: <RecipeListContainer />,
    loader: listLoader
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
