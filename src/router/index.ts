import Router from "express";
import mainRouter from "./mainRouter";
import userRouter from "./userRouter";
import securityRouter from "./securityRouter";
import errorMiddleware from "../middlewares/errorMiddleware";
import ApiException from "../exceptions/ApiException";

const router = Router();

router.use("/", mainRouter );
router.use("/api/auth", securityRouter);
router.use("/api/users", userRouter);

router.use( () => {
    throw new ApiException(404, 'Resource not found');
})

router.use(errorMiddleware);
export default router;