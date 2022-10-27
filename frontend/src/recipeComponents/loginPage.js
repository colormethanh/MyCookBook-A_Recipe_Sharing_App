import React, { useContext } from "react";

//Style & Components
import {Input, Label, Button } from "reactstrap";
import NavBar from "./navbar";
import "./registration.css"

//Auth
import AuthContext from "../context/AuthContext";


const LoginPage = () => {
  
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    username.length > 0 && loginUser(username, password);
  };

  return (
    <div className="login-background">
        <NavBar />
        <div className="container d-flex justify-content-center">
            <div className="login-form-wrapper d-flex justify-content-center">
                <form className="registration-form" onSubmit={handleSubmit}>
                <h1>Login </h1>
                <hr className="hr-login" />
                <Label htmlFor="username">Username</Label>
                <Input className="login-input" type="text" id="username" placeholder="Enter Username" />
                <br/>
                <Label htmlFor="password">Password</Label>
                <Input className="login-input" type="password" id="password" placeholder="Enter Password" />
                <br />
                <Button className="" type="submit">Login</Button>
                </form>
            </div>
                
        </div>
    </div>
      
    
  );
};

export default LoginPage;