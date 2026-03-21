import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ACCOUNT_TYPE } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOtp } from "../services/operations/authAPI"
import { setSignupData } from "../slices/authSlice"
import toast from "react-hot-toast";

export default function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // student or admin?
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  // for ui 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { firstName, lastName, email, password, confirmPassword } = formData;

  // onChangeHandler
  function handleOnChange(e) {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }


  // Handle Form Submission
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center">Join StudyNotion</h1>
        <p className="text-slate-400 text-center mt-2">Build skills for today and tomorrow</p>

        <div className="flex bg-slate-700 rounded-full p-1 mt-6">
          <button
            onClick={() => setAccountType("Student")}
            className={`w-1/2 py-2 rounded-full text-sm ${accountType === "Student" ? "bg-slate-900" : "text-slate-300"}`}
          >
            Student
          </button>
          <button
            onClick={() => setAccountType("Instructor")}
            className={`w-1/2 py-2 rounded-full text-sm ${accountType === "Instructor" ? "bg-slate-900" : "text-slate-300"}`}
          >
            Instructor
          </button>
        </div>

        <form className="space-y-4 mt-6" onSubmit={(e) => handleOnSubmit(e)}>
          <div className="flex gap-3">
            <input type="text" name="firstName" placeholder="First Name" onChange={handleOnChange} className="w-1/2 bg-slate-700 rounded-lg px-4 py-2 focus:outline-none" />
            <input type="text" name="lastName" placeholder="Last Name" onChange={handleOnChange} className="w-1/2 bg-slate-700 rounded-lg px-4 py-2 focus:outline-none" />
          </div>

          <input type="email" name="email" onChange={handleOnChange} placeholder="Email Address" className="w-full bg-slate-700 rounded-lg px-4 py-2 focus:outline-none" />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full bg-slate-700 rounded-lg px-4 py-2 pr-10 focus:outline-none"
              onChange={handleOnChange}
              name="password"
            />
            <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              className="w-full bg-slate-700 rounded-lg px-4 py-2 pr-10 focus:outline-none"
              onChange={handleOnChange}
              name="confirmPassword"
            />
            <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer">
              {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </span>
          </div>

          <button className="w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition">
            Create Account
          </button>
        </form>

        <p className="text-center text-sm text-slate-400 mt-6">
          Already have an account? <span className="text-yellow-400 cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}
