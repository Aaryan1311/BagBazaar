import { Router } from "express";

import { register,signin, logout } from "../../controllers/user.controller.js";
import { isAuthenticated, isLoggedIn, validateAuth, validateSignIn } from "../../middlewares/auth-request.validator.js";

const router = Router();

router.post(
    "/register", 
    validateAuth, 
    register,
);

router.post(
    '/login',
    validateSignIn ,
    signin
);

router.get(
    "/logout",
    isLoggedIn,
    logout
)
router.get(
    '/isAuthenticated',
    isAuthenticated, 
)
// router.put(
//     '/update',
//     AuthValidator.isLoggedIn,
//     UserController.updateProfile
// )

export default router;
