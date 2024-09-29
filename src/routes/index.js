import { Router } from "express";

import v1ApiRouters from "./v1/index.js";

const router = Router();

router.use("/v1", v1ApiRouters);

export default router;
