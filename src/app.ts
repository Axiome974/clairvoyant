import express from 'express';
import {PORT} from "./utils/envVariables";
import chalklogger from "./utils/chalklogger";
import router from "./router/index";
import bodyParser from "express";
import urlLoggerMiddleware from "./middlewares/urlLoggerMiddleware";


const app = express();
app.use( express.static('public') );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(urlLoggerMiddleware);
app.use(router);

app.listen( PORT , () => {
    chalklogger.success(`Server is running!`);
    chalklogger.log(`http://localhost:${PORT}`);
});