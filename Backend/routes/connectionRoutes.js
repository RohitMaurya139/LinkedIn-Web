import express from 'express';
import isAuth from "../middlewares/isAuth.js";
import { acceptConnection, getConnectionRequest, getConnectionStatus, getUserConnection, rejectConnection, removeConnection, sendConnection } from '../controllers/connectionController.js';
const connectionRouter = express.Router();

connectionRouter.post('/send/:id', isAuth, sendConnection)
connectionRouter.put('/accept/:connectionId', isAuth, acceptConnection);
connectionRouter.put("/reject/:connectionId", isAuth, rejectConnection);
connectionRouter.get("/getstatus/:userId", isAuth, getConnectionStatus);
connectionRouter.delete("/remove/:userId", isAuth, removeConnection);
connectionRouter.get("/requests", isAuth, getConnectionRequest);
connectionRouter.get("/all", isAuth, getUserConnection);


export default connectionRouter
