import Razorpay from "razorpay";
import User from "../model/user.model.js";
import AppError from "../utils/appError.js";
import Payment from "../model/payment.model.js";

export const getRazorpayApiKey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "Razorpay API Key fetched successfully",
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    new AppError(error.message, 500);
  }
};

export const getAllPayments = async (req, res) => {
  try {
    const { count } = req.query;

    const subscription = await Razorpay.subscriptions.all({
      count: count || 10,
    });

    res.status(200).json({
      success: true,
      message: "All payments fetched successfully",
      subscription,
    });
  } catch (error) {
    new AppError(error.message, 500);
  }
};
