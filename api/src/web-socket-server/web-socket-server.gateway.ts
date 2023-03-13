import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { User } from 'src/user/entities/user.entity';
import { WebSocketServerService } from './web-socket-server.service';

@WebSocketGateway({ path: '/bus-tracking', cors: true })
export class WebSocketServerGateway {
  @WebSocketServer() wss: Server;

  constructor(
    private readonly webSocketServerService: WebSocketServerService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const request = client.handshake.headers?.dataconnection as string;
      this.jwtService.verify(request);
      console.log(`Se ah conectado un nuevo usuario`);
    } catch (error) {
      console.log(error);
      client.disconnect();
      return;
    }
  }

  @SubscribeMessage('ruta')
  async handleDriverMessage(client: Socket, payload: any) {
    console.log(payload);
    const { id, ...coordinates } = payload;
    // Almacenar las coordenadas

    // Enviar las coordenadas a todos los clientes conectados a la misma ruta
    this.wss.to(`ruta/${id}`).emit('nuevasCoordenadas', { coordinates });
  }

  @SubscribeMessage('subscribe')
  handleSubscribe(client: any, data: any): void {
    const { rutaid } = data;
    console.log(`Cliente entro a ${rutaid}`);

    // Suscribir al cliente a la ruta `coordenadas/:rutaid`
    client.join(`ruta/${rutaid}`);
  }

  @SubscribeMessage('unsubscribe')
  handleUnsubscribe(client: any, data: any): void {
    const { rutaid } = data;

    // Desuscribir al cliente de la ruta `coordenadas/:rutaid`
    client.leave(`ruta/${rutaid}`);
  }
}
