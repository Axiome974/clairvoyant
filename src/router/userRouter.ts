import Router from "express";
import userController from "../controllers/api/userController";
import {User} from "../models";
import schemaValidationMiddleware from "../middlewares/schemaValidationMiddleware";
import errorCatcher from "../utils/errorCatcher";
import jwtAuthMiddleware from "../middlewares/jwtAuthMiddleware";
import roleCheckerMiddleware from "../middlewares/roleCheckerMiddleware";
import {ROLE_ADMIN} from "../enums/roleEnum";


const userRouter = Router();

userRouter.get("/",
    jwtAuthMiddleware,
    roleCheckerMiddleware(ROLE_ADMIN),
    errorCatcher(userController.browse)
);

userRouter.post("/",
    jwtAuthMiddleware,
    roleCheckerMiddleware(ROLE_ADMIN),
    schemaValidationMiddleware(User.prototype),
    errorCatcher(userController.add)
);

userRouter.get("/:id",
    jwtAuthMiddleware,
    roleCheckerMiddleware(ROLE_ADMIN),
    errorCatcher(userController.read)
);

userRouter.delete("/:id",
    jwtAuthMiddleware,
    roleCheckerMiddleware(ROLE_ADMIN),
    errorCatcher(userController.delete)
);

export default userRouter;