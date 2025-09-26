import { createContext } from "react";
import { io } from "socket.io-client";


export const UserData = createContext()

export const socket = io("https://netwise-webapp.onrender.com/");
