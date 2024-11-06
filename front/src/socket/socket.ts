import { io } from 'socket.io-client';
import config from '../config/config.json'

export const socket = io(config.socketUrl);

