import {Request} from "express";
import {User} from "../models";

export type RequestWithUser = Request & { user: User };