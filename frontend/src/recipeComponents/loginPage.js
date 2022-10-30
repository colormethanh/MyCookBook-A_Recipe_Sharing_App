import React, { useContext, useState } from "react";

//Style & Components
import {Input, Label, Button } from "reactstrap";
import NavBar from "./navbar";
import "./registration.css"

//Auth
import AuthContext from "../context/AuthContext";


const LoginPage = () => {
  
    const { loginUser } = useContext(AuthContext);
    const [usernameInput, setUsernameInput] = useState("");
    const [passwordInput, setPasswordInput] = useState("");


    function handleChange(e, setInput) {setInput(e.target.value)};

    function handleSubmit(e){
        e.preventDefault();
        const username = usernameInput;
        const password = passwordInput;
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
                        <Input 
                            className="login-input" 
                            type="text" id="username" 
                            value={usernameInput} 
                            onChange={(e) => handleChange(e, setUsernameInput)} 
                            placeholder="Enter Username" />
                        <br/>
                        <Label htmlFor="password">Password</Label>
                        <Input 
                            className="login-input" 
                            type="password" 
                            id="password" 
                            value={passwordInput} 
                            onChange={(e) => handleChange(e, setPasswordInput)} 
                            placeholder="Enter Password" />
                        <br />
                        <Button className="form-button" type="submit">Login</Button>
                    </form>
                </div>
                    
            </div>
        </div>
    );
};

export default LoginPage;