import JWT from "jsonwebtoken";

export const validateAuth = (req, res, next) => {
    if(!req.body.email || !req.body.password || !req.body.fullName){
        return res.status(400).json({
            message: "FullName, email and password are required",
            data: {},
            success: false,
            err: 'Fullname, Email or Password are missing'
        })
    }
    next();
}

export const validateSignIn = (req,res,next) => {
  if(!req.body.email || !req.body.password){
    return res.status(400).json({
      message: "Something went wrong",
      data: {},
      success: false,
      err: "Email and Password are mandatory",
    });
  }
  next();
}

export const validateIsAdminRequest = (req, res, next) => {
    console.log("USERID::",req.body.userId)
    if(!req.body.userId){
        return res.status(400).json({
            message: "User id is required",
            data: {},
            success: false,
            err: 'User id is missing'
        })
    }
    next();dddd
}

export const isLoggedIn = (req, res, next) => {
  // verify token
  const token = (req.cookies && req.cookies.token) || null;
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "Not authorized",
    });
  }
  // inject user information in req
  try {
    const payload = JWT.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, email: payload.email };
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
  next();
};

export const isAuthenticated = (req, res, next) => {
  // verify token
  const token = (req.cookies && req.cookies.token);
  if (!token) {
    return res.status(400).json({
      success: false,
      message: "User not authenticated, please signin/signup",
    });
  }
  return res.status(200).json({
    success: true,
    message: "User is authenticated",
    data: {},
    error: null
  })
  next();
};