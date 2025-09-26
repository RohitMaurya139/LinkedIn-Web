import { createContext } from "react";
import { io } from "socket.io-client";


export const UserData = createContext()

export const socket = io("http://localhost:4000");