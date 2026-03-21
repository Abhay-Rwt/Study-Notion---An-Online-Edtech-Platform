const User = require('../models/User')
const Otp = require('../models/Otp')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const Profile = require('../models/Profile')
const jwt = require('jsonwebtoken')

// sent OTP;
exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered"
            });
        }

        // generate otp;
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        });

        // console.log(otp);

        // check unique otp or not;
        var result = await Otp.findOne({ otp: otp });

        // while (result) {
        //     otp = otpGenerator.generate(6, {
        //         upperCaseAlphabets: false,
        //         lowerCaseAlphabets: false,
        //         specialChars: false
        //     });
        //     result = await Otp.findOne({ otp: otp });
        // }

        // insert in DB;
        const otpPayload = { email, otp };
        const otpBody = await Otp.create(otpPayload);
        // console.log(otpBody);

        res.status(200).json({
            success: true,
            message: 'OTP sent successfully',
            otp,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


// sign up;
exports.signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, confirmPassword, accountType, contactNumber, otp } = req.body;

        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (confirmPassword !== password) {
            return res.status(400).json({
                success: false,
                message: "Password and confirm password doesn't match"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered"
            });
        }

        const recentOtp = await Otp.find({ email }).sort({ createdAt: -1 }).limit(1);

        console.log(recentOtp);

        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Otp not found"
            });
        }
        else if (otp !== recentOtp[0].otp.toString()) {
            return res.json({
                success: false,
                message: "Invalid otp"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about: null,
            contactNumber: null,
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
        });

        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User can't register"
        })
    }
}


// login;
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required"
            });
        }

        const user = await User.findOne({ email }).populate("additionalDetails").exec();

        if (!user) {
            res.status(401).json({
                success: false,
                message: "User is not registered"
            });
        }

        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            })

            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };

            console.log(user);

            // res.cookie("token", token, options).status(200).json({
            //     success: true,
            //     token,
            //     user,
            //     message: "Logged in successfully"
            // });

            res.cookie("token", token, {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,       // secure from JS (good)
                secure: true,         // REQUIRED for HTTPS in production
                sameSite: "None",     // REQUIRED for cross-site cookies
            }).status(200).json({
                success: true,
                token,
                user,
                message: "Logged in successfully"
            });
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect"
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Login failure"
        });
    }
}


// change password;
exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        console.log(req.body.user._id);
        const userId = req.body.user._id;

        if (!oldPassword || !newPassword || !userId) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUserDetails = await User.findByIdAndUpdate(
            { _id: userId },
            { password: hashedPassword },
            { new: true },
        );

        console.log("Updated user details.......", updatedUserDetails);

        return res.status(200).json({
            success: true,
            message: "Password changed successfully",
            updatedUserDetails,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to update password",
        });
    }
}