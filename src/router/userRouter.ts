import Router from "express";
import userController from "../controllers/api/userController";
import {User} from "../models";
import schemaValidationMiddleware from "../middlewares/schemaValidationMiddleware";
import errorCatcher from "../utils/errorCatcher";
import jwtAuthMiddleware from "../middlewares/jwtAuthMiddleware";
import roleCheckerMiddleware from "../middlewares/roleCheckerMiddleware";
import {ROLE_ADMIN} from "../enums/roleEnum";
import paginationQueryMiddleware from "../middlewares/paginationQueryMiddleware";
import {userCreateSchema} from "../schemas/userSchema";


const userRouter = Router();

userRouter.get("/",
    jwtAuthMiddleware,
    roleCheckerMiddleware(ROLE_ADMIN),
    paginationQueryMiddleware,
    errorCatcher(userController.browse)
);

userRouter.post("/",
    jwtAuthMiddleware,
    roleCheckerMiddleware(ROLE_ADMIN),
    schemaValidationMiddleware(userCreateSchema),
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