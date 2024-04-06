import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";

function Register({authPrivate, authParent}) {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();
        try {
            const userData = {
                username: name,
                type: 'Parent',
                email: email,
                password: password,
            };

            // Use axios for making the POST request
            const response = await axios.post("/api/users/register", userData);

            // Handle response as needed (e.g., redirect after successful registration)
            alert('Your account has been registered for approval! You will receive an email from the admin for status updates.');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Container className="h-screen">
            <div className="login">
                <div className="login-page m-auto">
                    <div className="form">
                        <form className="register-form">
                            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                            <input type="text" onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            <button type="submit" onClick={submit}>Create</button>
                            <p className="message"> Already registered? <a href="login">Login</a></p>
                        </form>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export default Register;