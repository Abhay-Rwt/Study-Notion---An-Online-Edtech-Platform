import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getPasswordResetToken } from '../services/operations/authAPI';
import { BiArrowBack } from "react-icons/bi"

const ForgotPassword = () => {
  const { loading } = useSelector((state) => state.auth);
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(getPasswordResetToken(email, setEmailSent));
  }

return (
  <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center bg-slate-900 px-4">
    {loading ? (
      <div className="spinner"></div>
    ) : (
      <div className="w-full max-w-md rounded-xl bg-slate-800 p-6 shadow-lg lg:p-8">
        <h1 className="text-2xl font-semibold text-white">
          {!emailSent ? "Reset your password" : "Check your email"}
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-gray-400">
          {!emailSent
            ? "No worries. We’ll send you instructions to reset your password. If you don’t have access to your email, we can try account recovery."
            : `We’ve sent a password reset link to `}
          {emailSent && <span className="font-medium text-yellow-50">{email}</span>}
        </p>

        <form onSubmit={handleOnSubmit} className="mt-6 space-y-5">
          {!emailSent && (
            <div>
              <label className="mb-1 block text-sm text-white">
                Email Address <sup className="text-pink-200">*</sup>
              </label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-md bg-richblack-700 px-3 py-2 text-white outline-none transition focus:ring-2 focus:ring-yellow-50"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-md bg-yellow-400 py-3 font-semibold text-black transition active:scale-[0.98]"
          >
            {!emailSent ? "Submit" : "Resend Email"}
          </button>
        </form>

        <div className="mt-6">
          <Link to="/login" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white">
            <BiArrowBack />
            Back to Login
          </Link>
        </div>
      </div>
    )}
  </div>
)

}

export default ForgotPassword