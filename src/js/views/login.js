import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";


const Login = () => {
    const [email, setEmail] = useState(""); // State for email input
    const [password, setPassword] = useState(""); // State for password input
    const [error, setError] = useState(""); // State for error messages
    const navigate = useNavigate(); // React Router navigation
    const { store, actions } = useContext(Context);

    // Function to handle creating a new user
    const handleCreateUser = (e) => {
        e.preventDefault(); // Prevent page reload

        fetch("https://obscure-space-palm-tree-x596gxj994wwfvwg4-3000.app.github.dev/user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Send JSON data
            },
            body: JSON.stringify({ email, password, is_active: true }), // Send email and password for creation
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.message === "User added successfully") {
                    setError(""); // Clear error
                    alert("User created successfully! Please log in."); // Notify user
                } else {
                    setError(data.message || "Failed to create user."); // Display error message
                }
            })
            .catch(() => setError("An error occurred. Please try again.")); // Handle fetch errors
    };

    // Function to handle logging in an existing user
    const handleLogin = (e) => {
        e.preventDefault(); // Prevent page reload
    
        fetch("https://obscure-space-palm-tree-x596gxj994wwfvwg4-3000.app.github.dev/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // Indicate JSON data
            },
            body: JSON.stringify({ email, password }), // Send email and password
        })
            .then((res) => res.json()) // Parse JSON response
            .then((data) => {
                if (data.message === "Login successful") {
                    actions.setUid(data.user.id)
                    setError(""); // Clear error
                    alert("Login successful!"); // Notify user
                    navigate("/"); // Redirect to home page
                } else {
                    setError(data.message || "Login failed."); // Display error message
                }
            })
            .catch(() => setError("An error occurred. Please try again.")); // Handle fetch errors
    };

    return (
        <div className="login-container">
            <h1>Login or Create Account</h1>
            <form>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state
                    />
                </div>
                {error && <p style={{ color: "red" }}>{error}</p>} {/* Show error if present */}
                <button type="button" onClick={handleCreateUser}>
                    Create
                </button>
                <button type="button" onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
