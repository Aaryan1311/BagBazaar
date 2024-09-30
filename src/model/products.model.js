import product from "../model/product.model.js";
import AppError from "../utils/appError.js";
import fs from "fs";
import cloudinary from "cloudinary";

const getAllProducts = async (req, res, next) => {
  try {
    const products = await product.find({}).select("-lectures");
    res.status(200).json({
      success: true,
      message: "All products:",
      products,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const getLecturesByProductId = async (req, res, next) => {
  try {
    const { productID } = req.params;
    const product = await product.findById(productID);
    if (!product) {
      return next(new AppError("No product found with this ID", 404));
    }
    res.status(200).json({
      success: true,
      message: "Lectures of the product:",
      lectures: product.lectures,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const createProduct = async (req, res, next) => {
  try {
    const { title, description, category, createdBy } = req.body;
    if (!title || !description || !category || !createdBy) {
      return next(new AppError("All fields are required", 400));
    }
    const product = await product.create({
      title,
      description,
      category,
      createdBy,
      thumbnail: {
        public_id: "DUMMY",
        secure_url: "DUMMY",
      },
    });
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "lms",
      });
      if (result) {
        product.thumbnail = {
          public_id: result.public_id,
          secure_url: result.secure_url,
        };
      }
      fs.rm("uploads/${req.file.filename}");
    }
    await product.save();
    res.status(201).json({
      success: true,
      message: "product created successfully",
      product,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const { productID } = req.params;
    const product = await product.findByIdAndUpdate(
      productID,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );
    if (!product) {
      return next(new AppError("No product found with this ID", 404));
    }
    res.status(200).json({
      success: true,
      message: "product updated successfully",
      product,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const { productID } = req.params;
    const product = await product.findById(productID);
    if (!product) {
      return next(new AppError("No product found with this ID", 404));
    }
    await product.findByIdAndDelete(productID);
    res.status(200).json({
      success: true,
      message: "product deleted successfully",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

export {
  getAllProducts,
  getLecturesByProductId,
  createProduct,
  updateProduct,
  deleteProduct,
};
