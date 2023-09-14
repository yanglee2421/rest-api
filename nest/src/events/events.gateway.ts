// NestJs Imports
import {
  SubscribeMessage,
  WebSocketGateway,
  ConnectedSocket,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';

// WebSocket Imports
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin(requestOrigin, callback) {
      void requestOrigin;
      callback(null, true);
    },
  },
})
export class EventsGateway {
  @WebSocketServer() server: Server;

  @SubscribeMessage('msg')
  handleMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() payload: string,
  ): string {
    console.log(socket, payload);
    return 'Hello world!';
  }
}
