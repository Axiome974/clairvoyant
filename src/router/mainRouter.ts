import Router from 'express';
import mainController from "../controllers/mainController";

const mainRouter = Router();

mainRouter.get("/", mainController.home);

export default mainRouter;