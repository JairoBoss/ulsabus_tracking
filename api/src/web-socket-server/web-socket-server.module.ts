import { Module } from '@nestjs/common';
import { WebSocketServerService } from './web-socket-server.service';
import { WebSocketServerGateway } from './web-socket-server.gateway';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  providers: [WebSocketServerGateway, WebSocketServerService],
  imports: [AuthModule],
})
export class WebSocketServerModule {}
