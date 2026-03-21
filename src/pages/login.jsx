import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/authAPI"

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const changeHandler = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password, navigate));
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
            <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8">
                <h1 className="text-3xl font-bold text-center">Welcome Back</h1>
                <p className="text-slate-400 text-center mt-2">Login to your StudyNotion account</p>

                <form className="space-y-4 mt-6" onSubmit={submitHandler}>
                    <input
                        name="email"
                        type="email"
                        value={email}
                        placeholder="Email Address"
                        className="w-full bg-slate-700 rounded-lg px-4 py-2 focus:outline-none"
                        onChange={changeHandler}
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            name="password"
                            className="w-full bg-slate-700 rounded-lg px-4 py-2 pr-10 focus:outline-none"
                            onChange={changeHandler}
                        />
                        <span
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </div>

                    <div className="text-right">
                        <Link to="/forgot-password"><span className="text-sm text-yellow-400 cursor-pointer">Forgot Password?</span></Link>
                    </div>

                    <button className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition">
                        Login
                    </button>
                </form>

                <p className="text-center text-sm text-slate-400 mt-6">
                    Don’t have an account? <span className="text-yellow-400 cursor-pointer">Sign Up</span>
                </p>
            </div>
        </div>
    );
}
