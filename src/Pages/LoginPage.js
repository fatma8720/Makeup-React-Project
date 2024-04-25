import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom";

function LoginPage({ setIsAuthenticated }) {
    const history = useHistory();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        showPassword: false
    });

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        setErrors({
            emailError: "",
            passwordError: ""
        });
    };

    const PasswordVisibility = () => {
        setFormData({
            ...formData,
            showPassword: !formData.showPassword
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.email === formData.email && userData.password === formData.password) {
            localStorage.setItem('isAuthenticated', true);
             setIsAuthenticated(true);
            history.push('/products');
        } else {
            alert("Invalid email or password. Please try again.");
            setFormData({
                email: "",
                password: "",
                showPassword: false
            });
        }
    };

    return (
        <div className="container text-center">
            <h1 style={{ marginTop: "80px", marginBottom: "40px", fontWeight: "bold", color: "#000" }}>Login</h1>
            <div style={{ maxWidth: "400px", margin: "auto" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{ fontWeight: "bold" }}>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.emailError}
                        />
                        <Form.Control.Feedback type="invalid">{errors.emailError}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label style={{ fontWeight: "bold" }}>Password</Form.Label>
                        <Form.Control
                            type={formData.showPassword ? "text" : "password"}
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.passwordError}
                        />
                        <Form.Control.Feedback type="invalid">{errors.passwordError}</Form.Control.Feedback>
                        <Form.Text className="text-muted">
                            <Button variant="link" onClick={PasswordVisibility}>
                                {formData.showPassword ? "Hide" : "Show"} Password
                            </Button>
                        </Form.Text>
                    </Form.Group>

                    <Button variant="dark" type="submit" style={{ margin: "10px" }}>
                        Submit
                    </Button>
                </Form>
            </div>
            <div style={{ marginTop: "20px" }}>
                Don't have an account? <a href="/register">Register here</a>
            </div>
        </div>
    );
}

export default LoginPage;
