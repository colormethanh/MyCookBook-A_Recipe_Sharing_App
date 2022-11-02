import React from 'react';
import ReactDOM from 'react-dom/client';

// Bootstrap & styling
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

// Routing
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Outlet,
} from "react-router-dom";


//Auth
import { AuthProvider } from './context/AuthContext'

// components
import RecipeCreateContainer from './recipeComponents/recipeCreate';
import RecipeContainer, {recipeLoader} from './recipeComponents/recipeContainer';
import RecipeListContainer, {listLoader} from './recipeComponents/recipeList';
import HomePage, { homeLoader } from './recipeComponents/home';
import LoginPage from './recipeComponents/loginPage';
import RegisterPage from './recipeComponents/registerPage';
import PrivateRoute from './utils/PrivateRoute';



const root = ReactDOM.createRoot(document.getElementById('root'));

const AuthProviderLayout = () => (
    <AuthProvider>
        <Outlet />
    </AuthProvider>
)

const JSXRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<AuthProviderLayout />}>
            <Route path="/" element={<HomePage />} loader={homeLoader} />
            <Route path="/:id" element={<RecipeContainer />} loader={recipeLoader} />
            <Route 
                path="/RecipeCreate" 
                element={
                    <PrivateRoute>
                         <RecipeCreateContainer />
                    </PrivateRoute> 
                    } 
            />
            <Route path="/RecipeList" element={<RecipeListContainer />} loader={listLoader} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            
        </Route>
    ))

root.render(
    <React.StrictMode>
        <RouterProvider router={JSXRouter}/>
    </React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
