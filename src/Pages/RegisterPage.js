import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory} from 'react-router-dom';

function RegisterPage() {
    const [formData, setFormData] = useState({
        email: "",
        name: "",
        username: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        emailError: "",
        nameError: "",
        usernameError: "",
        passwordError: "",
        confirmPasswordError: ""
    });

    const history = useHistory();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name, value);
    };

    const validateField = (name, value) => {
        switch (name) {
            case "email":
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                setErrors({
                    ...errors,
                    emailError: value.length === 0 ? "Email is required" : !emailRegex.test(value) && "Invalid email format"
                });
                break;
            case "name":
                setErrors({
                    ...errors,
                    nameError: value.length === 0 ? "Name is required" : ""
                });
                break;
            case "username":
                const usernameRegex = /^\S*$/; 
                setErrors({
                    ...errors,
                    usernameError: value.length === 0 ? "Username is required" : !usernameRegex.test(value) && "Username should not contain spaces"
                });
                break;
            case "password":
                const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=.*[^\w\d\s]).{8,}$/;
                setErrors({
                    ...errors,
                    passwordError: value.length < 8 ? "Password must be at least 8 characters long" : !passwordRegex.test(value) && "Password must contain at least one lowercase, one uppercase, one digit, and one special character ,Example: P@ssword1234"
                });
                break;
            case "confirmPassword":
                setErrors({
                    ...errors,
                    confirmPasswordError: value !== formData.password ? "Passwords do not match" : ""
                });
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        for (const error in errors) {
            if (errors[error]) {
                return;
            }
        }
        if (formData.password !== formData.confirmPassword) {
            setErrors({
                ...errors,
                confirmPasswordError: "Passwords do not match"
            });
            return;
        }

        localStorage.setItem('userData', JSON.stringify(formData));
        alert("You have successfully registered! Please login to continue.");
        history.push('/login');
    };

    return (
        <div className="container text-center">
            <h1 style={{ marginTop: "80px", marginBottom: "40px", fontWeight: "bold", color: "#000", textAlign: "center" }}>Register</h1>
            <div style={{ maxWidth: "400px", margin: "auto" }}>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicName">
                        <Form.Label style={{float:"left" }}>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            isInvalid={!!errors.nameError}
                        />
                        <Form.Control.Feedback type="invalid">{errors.nameError}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label style={{float:"left" }}>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            isInvalid={!!errors.emailError}
                        />
                        <Form.Control.Feedback type="invalid">{errors.emailError}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicUsername">
                        <Form.Label style={{float:"left" }}>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            isInvalid={!!errors.usernameError}
                        />
                        <Form.Control.Feedback type="invalid">{errors.usernameError}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label  style={{float:"left" }}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            isInvalid={!!errors.passwordError}
                        />
                        <Form.Control.Feedback type="invalid">{errors.passwordError}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label style={{float:"left" }}>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            isInvalid={!!errors.confirmPasswordError}
                        />
                        <Form.Control.Feedback type="invalid">{errors.confirmPasswordError}</Form.Control.Feedback>
                    </Form.Group>

                    <Button variant="dark" type="submit" style={{ margin: "20px" }}>
                        Register
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default RegisterPage;
