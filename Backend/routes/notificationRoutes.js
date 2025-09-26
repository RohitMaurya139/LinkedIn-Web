import express from 'express';
import isAuth from "../middlewares/isAuth.js";
import { clearAllNotifications, deleteNotifications, getNotifications } from '../controllers/notificationController.js';

const notificationRouter = express.Router();

notificationRouter.get("/get", isAuth, getNotifications);
notificationRouter.delete("/delete/:id", isAuth, deleteNotifications);
notificationRouter.delete("/clear", isAuth, clearAllNotifications);




export default notificationRouter;
