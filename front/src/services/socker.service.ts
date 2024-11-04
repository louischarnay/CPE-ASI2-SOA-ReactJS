// SocketService.ts
import { io, Socket } from "socket.io-client";

class SocketService {
  private socket: Socket | null = null;

  constructor(private url: string) {}

  connect() {
    this.socket = io(this.url);

    this.socket.on("connect", () => {
      console.log("🔗 Socket.IO connected:", this.socket?.id);
    });

    this.socket.on("disconnect", () => {
      console.log("❌ Socket.IO disconnected");
    });
  }

  disconnect() {
    this.socket?.disconnect();
    console.log("🔌 Socket.IO connection closed");
  }

  sendMessage(event: string, message: any) {
    this.socket?.emit(event, message);
  }

  onMessage(event: string, callback: (data: any) => void) {
    this.socket?.on(event, callback);
  }
}

export default SocketService;
