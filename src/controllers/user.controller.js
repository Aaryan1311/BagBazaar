import User from "../model/userModel.js";
import AppError from "../utils/appError.js";
import fs from "fs/promises";
import crypto from "crypto";

import {
  createUser,
  loginUser,
//   mailResetToken,
} from "../service/user.service.js";


export const register = async (req, res) => {
  try {
    // checking the required fields
    const { fullName, email, password } = req.body;
    if (!fullName || !password || !email) {
      new Error("All fields are required", 400);
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      new Error("Email already exists", 400);
    }
    // Create user
    const user = await createUser({ fullName, email, password});

    // Set JWT token in cookie
    const token = await user.generateJWTToken();
    user.password = undefined;
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      success: true,
      message: "User registerd successfully",
      user,
    });
  } catch (error) {
    let statusCode = 500;
    if (error.name === "ValidationError" || error.name === "MongoServerError")
      statusCode = 400;
    return res.status(statusCode).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: error.message,
    });
  }
};


export const signin = async (req, res) => {
    try {
      // checking the required fields
      const { email, password } = req.body;
      
      if (!password || !email) {
        return res.status(400).json({
          message: "Something went wrong",
          data: {},
          success: false,
          err: "Email and Password are mandatory",
        });
      }
      // Login user
      const user = await loginUser({ email, password });
  
      // Set JWT token in cookie
      const token = await user.generateJWTToken();
      user.password = undefined;
      res.cookie("token", token, cookieOptions);
  
      res.status(201).json({
        success: true,
        message: "User login successfully",
        user,
      });
    } catch (error) {
      let statusCode = 500;
      return res.status(statusCode).json({
        message: "Unable to login",
        data: {},
        success: false,
        err: error,
      });
    }
  };


export const logout = (req, res) => {
  res.cookie("token", null, {
    secure: true,
    maxAge: 0,
    httpOnly: true,
  });
  res.status(200).json({
    message: "User logged out successfully",
    data: {},
    success: true,
    err: null,
  });
};