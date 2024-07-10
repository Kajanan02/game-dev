import asyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";
import gameDataSchema from "../modals/GameDataSchema.js";
import sendEmail from "../utils/email-service/email.js";

const registerUser = asyncHandler(async (req, res) => {
    const {
        username,
        name,
        password
    } = req.body;
    const userExists = await User.findOne({username})
    if (userExists) {
        res.status(400)
        throw new Error("User already exists")
    }

    const user = await User.create({
        username,
        name,
        password
    })

    if(user){
        res.status(201).json({
            _id: user._id,
            username: user.username,
            name: user.name,
            password: user.password,
        })
    } else {
        res.status(400).json({status: "FAILED", message: "User not created", data: {user}});
    }

})





const verifyOTP = asyncHandler(async (req, res) => {
    let userId;

    if (req.body.userId) {
        userId = req.body.userId;
    } else if (req.user && req.user._id) {
        userId = req.user._id;
    } else if (req.body.email) {
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).json({status: "FAILED", message: "No user found", data: {userId}});
        } else {
            userId = user._id;
        }
    } else {
        return res.status(400).json({status: "FAILED", message: "No user found", data: {userId}});
    }

    const {otp} = req.body;
    console.log(userId, otp, "verifyOTP");

    try {
        const userOTPVerification = await gameDataSchema.findOne({userId});
        if (!userOTPVerification) {
            return res.status(400).json({status: "FAILED", message: "OTP not found", data: {userId}});
        }

        console.log(userOTPVerification.expiredAt)

        const currentTime = new Date(userOTPVerification.createdAt);
        const expiredAt = new Date(userOTPVerification.expiredAt);

        if (expiredAt < currentTime) {
            return res.status(400).json({status: "FAILED", message: "OTP expired", data: {userId}});
        }

        if (userOTPVerification.isExpired) {
            return res.status(400).json({status: "FAILED", message: "OTP expired", data: {userId}});
        }

        const isMatch = await bcrypt.compare(otp.toString(), userOTPVerification.otp);
        if (isMatch) {
            const user = await User.findById(userId);
            user.isEmailVerified = true;
            await user.save();
            userOTPVerification.isExpired = true;
            await userOTPVerification.save();
            return res.status(200).json({
                status: "SUCCESS",
                message: "OTP verified successfully",
                data: {userId}
            });
        } else {
            return res.status(400).json({status: "FAILED", message: "Invalid OTP", data: {userId}});
        }
    } catch (error) {
        res.status(500).json({status: "FAILED", message: "Server error", error: error.message});
    }
});


const loginUser = asyncHandler(async (req, res) => {
    const {username, password} = req.body;
    const user = await User.findOne({username});
    if (user && (await user.matchPassword(password))) {
        let token = generateToken(res, user._id);
        res.status(200).json({
            _id: user._id,
            username: user.username,
            name: user.name,
            password: user.password,
            token: token
        })
    } else {
        res.status(401)
        throw new Error("Invalid email or password")
    }
})

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })
    res.status(200).json({message: "User logged out successfully"})

})

const forgotPassword = asyncHandler(async (req, res) => {
    const {username} = req.body;
    const user = await User.findOne({username});
    if (user) {
        sendOTP(user, res);
        res.status(200).json({message: "OTP sent successfully"})
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})


const resetPassword = asyncHandler(async (req, res) => {
    const {email, otp, password} = req.body;
    const userOTPVerification = await gameDataSchema.findOne({email})

    if (userOTPVerification.expiredAt < Date.now()) {
        return res.status(400).json({status: "FAILED", message: "OTP expired", data: {email}});
    } else if (userOTPVerification.isExpired) {
        return res.status(400).json({status: "FAILED", message: "OTP expired", data: {email}});
    } else if (userOTPVerification) {
        const isMatch = await bcrypt.compare(otp.toString(), userOTPVerification.otp);
        if (isMatch) {

            const user = await User.findById(userOTPVerification.userId)
            user.password = password;
            userOTPVerification.isExpired = true;
            await userOTPVerification.save();
            await user.save();
            res.status(200).json({message: "Password reset successfully"})
        } else {
            res.status(400)
            throw new Error("Invalid OTP")
        }
    } else {
        res.status(400)
        throw new Error("OTP not found")
    }
})

const updateUser = asyncHandler(async (req, res) => {
    const _id = req.params.id;
    const user = await User.findById({_id});
    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.role = req.body.role || user.role;
        user.contactNo = req.body.contactNo || user.contactNo;
        user.gender = req.body.gender || user.gender;
        user.address = req.body.address || user.address;
        user.nicNo = req.body.nicNo || user.nicNo;
        user.nicFront = req.body.nicFront || user.nicFront;
        user.nicBack = req.body.nicBack || user.nicBack;
        user.profilePic = req.body.profilePic || user.profilePic;
        user.isVerified = req.body.isVerified || user.isVerified;
        user.isEmailVerified = req.body.isEmailVerified || user.isEmailVerified;

        if (req.body.password) {
            user.password = req.body.password;
        }
        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
            role: updatedUser.role,
            contactNo: updatedUser.contactNo,
            gender: updatedUser.gender,
            address: updatedUser.address,
            nicNo: updatedUser.nicNo,
            nicFront: updatedUser.nicFront,
            nicBack: updatedUser.nicBack,
            profilePic: updatedUser.profilePic,
            isVerified: updatedUser.isVerified,
            isEmailVerified: updatedUser.isEmailVerified,
        })
    } else {
        res.status(404)
        throw new Error("User not found")
    }
})

const addGameData = asyncHandler(async (req, res) => {
    const {
        userId,
        gameType,
        level,
        score,
        timeTaken
    } = req.body;


    const game = await gameDataSchema.create({
        userId,
        gameType,
        level,
        score,
        timeTaken
    })

    if(game){
        res.status(201).json({
            _id: game._id,
            userId: game.userId,
            gameType: game.gameType,
            level: game.level,
            score: game.score,
            timeTaken: game.timeTaken
        })
    } else {
        res.status(400).json({status: "FAILED", message: "Game not created", data: {user: game}});
    }
})

const viewGamesData = asyncHandler(async (req, res) => {
    const games = await gameDataSchema.find({userId: req.params.id});
    if(games){
        res.status(200).json(games)
    }else {
        res.status(404).json({status: "FAILED", message: "Games not found", data: {games}});
    }

})



export {registerUser, verifyOTP, loginUser, logoutUser, forgotPassword, resetPassword,updateUser,addGameData,viewGamesData}

