import React, { useState, useContext } from "react";

//Style & Componenets
import { Input, Label, Button } from "reactstrap";
import NavBar from "./navbar";

//Auth
import AuthContext from "../context/AuthContext";


function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault();
    registerUser(username, password, password2);
  };

  return (
    <div className="login-background">

        <NavBar />
        <div className="container d-flex justify-content-center">
            <div className="login-form-wrapper d-flex justify-content-center">
                <form className="registration-form" onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <hr />
                    <div>
                        <Label htmlFor="username">Username</Label>
                        <Input
                            type="text"
                            id="username"
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                        />
                    </div>
                    <br/>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                    </div>
                    <br />
                    <div>
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input
                            type="password"
                            id="confirm-password"
                            onChange={e => setPassword2(e.target.value)}
                            placeholder="Confirm Password"
                            required
                        />
                        <p>{password2 !== password ? "Passwords do not match" : ""}</p>
                    </div>
                    <br />
                    <Button type="submit">Register</Button>
                </form>
            </div>
            
        </div>
        
    </div>
  );
}

export default RegisterPage;