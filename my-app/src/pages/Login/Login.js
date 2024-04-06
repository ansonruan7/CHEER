import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Container } from "@mui/material";

function Login({ authAdmin, authParent, authPrivate, authEmployee }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submit(e) {
        e.preventDefault();
        try {
            const loginData = {
                email: email,
                password: password,
            };

            const response = await axios.post("/api/users/login", loginData);

            console.log("Login Response:", response.data.user.type);

            if (response.status === 200) {
                alert('Login successful!');
                Object.values(response).forEach(value => {
                    if (value.token) {
                        localStorage.setItem("token", value.token);
                    }
                });

                // Check if 'type' property exists in the response data
                const userType = response.data.user && response.data.user.type;
                if (userType === "Private") {
                    authPrivate();
                } else if (userType === "Parent"){
                    authParent();
                } else if (userType === "Admin"){
                    authAdmin();
                } else if (userType === "Employee"){
                    authEmployee();
                }
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (error) {
            alert('Login failed. Please check your credentials.');
        }
    }

    return (
        <Container>
            <div className="login h-screen">
                <form>
                    <div className="register-page m-auto">
                        <div className="form">
                            <form className="register-form">
                                <input
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email"
                                />
                                <input
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Password"
                                />
                                <button type="submit" onClick={submit}>
                                    Login
                                </button>
                                <p className="message">
                                    Not registered? <Link to="/register">Register</Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </form>
            </div>
        </Container>
    );
}

export default Login;