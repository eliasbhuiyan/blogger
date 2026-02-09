import React, { useState } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import { Link, useNavigate } from "react-router";
import { useLoginMutation } from "../service/api";

const Login = () => {
    const [login, { isLoading, isSuccess }] = useLoginMutation()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(formData).unwrap();
            if (res.success) {
                navigate("/dashboard")
            }
        } catch (error) {
            console.error(error.data.message);
        }
    };



    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
            <Card className="w-full max-w-md">
                <Card.Header>
                    <h2 className="text-center text-xl font-semibold">
                        Sign In to Your Account
                    </h2>
                </Card.Header>

                <Card.Body>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type="password"
                            placeholder="********"
                            value={formData.password}
                            onChange={handleChange}
                        />

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2">
                                <input type="checkbox" className="rounded" />
                                <span>Remember me</span>
                            </label>

                            <Link
                                to="/forgot-password"
                                className="text-blue-600 hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <Button disabled={isLoading} type="submit" className="w-full">
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </Card.Body>

                <Card.Footer className="text-center">
                    <p className="text-sm">
                        Don’t have an account?{" "}
                        <Link
                            to="/registration"
                            className="text-blue-600 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </Card.Footer>
            </Card>
        </div>
    );
};

export default Login;
