import Router from 'express';
import securityController from "../controllers/api/securityController";
import jwtAuthMiddleware from "../middlewares/jwtAuthMiddleware";
import errorCatcher from "../utils/errorCatcher";
import SchemaValidationMiddleware from "../middlewares/schemaValidationMiddleware";
import {userCreateSchema} from "../schemas/userSchema";

const securityRouter = Router();

securityRouter.post("/login", errorCatcher(securityController.login));
securityRouter.post("/refresh", errorCatcher(securityController.refreshToken));
securityRouter.post("/revoke", errorCatcher(securityController.revokeToken));
securityRouter.get("/profile", jwtAuthMiddleware, errorCatcher(securityController.profile));
securityRouter.post("/register", SchemaValidationMiddleware(userCreateSchema), errorCatcher(securityController.register));

export default securityRouter;