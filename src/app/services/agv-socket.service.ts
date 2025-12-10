// src/app/services/agv-socket.service.ts
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { io, Socket } from "socket.io-client";

export interface AgvMessage {
  topic: string;
  serial: string;
  payload: any;
}

@Injectable({ providedIn: "root" })
export class AgvSocketService {
  private socket: Socket;
  private readonly URL = "http://localhost:3000";

  constructor() {
    this.socket = io(this.URL, { transports: ["websocket", "polling"] });
    this.socket.on("connect", () => console.log("✅ Connected to Socket.IO"));
    this.socket.on("connect_error", (err) => console.error("❌ Socket Error", err));
  }

  onAgvStatus(): Observable<AgvMessage> {
    return new Observable((subscriber) => {
      this.socket.on("agv-status", (msg: AgvMessage) => subscriber.next(msg));
      return () => this.socket.off("agv-status");
    });
  }
}
