import { io } from "socket.io-client";


// const SOCKET_SERVER_URL = "https://socket.nomineelife.com";

const SOCKET_SERVER_URL = process.env.NEXT_PUBLIC_SOCKET_SERVER_URL || ""

const socket = io(SOCKET_SERVER_URL);

export default socket;
