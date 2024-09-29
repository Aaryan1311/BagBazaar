import User from "../model/userModel.js";


export const createUser = async ({ fullName, email, password, avatarFile, path }) => {
    try {
      const user = await User.create({
        fullName,
        email,
        password
      });
  
      await user.save();
  
      return user;
    } catch (error) {
      throw error;
    }
  };


export const loginUser = async ({ email, password }) => {
    try {
      const user = await User.findOne({ email }).select("+password");
      if (!user || !(await user.comparePassword(password))) {
        return res.status(400).json({
          message: "Invalid Credentials",
          data: {},
          success: false,
          err: "Email not found or password is incorrect",
        });
      }
      return user;
    } catch (error) {
      throw error;
    }
  };