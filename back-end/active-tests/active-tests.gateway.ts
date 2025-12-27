import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtGuard } from '../userEngine/jwt.guard';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway()
@UseGuards(JwtGuard)
export class ActiveTestsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinTest')
  handleJoinTest(
    @MessageBody() data: { testId: string },
    @ConnectedSocket() client: Socket,
  ) {
    client.join(`test-${data.testId}`);
  }

  @SubscribeMessage('answerQuestion')
  handleAnswerQuestion(
    @MessageBody() data: { testId: string; questionId: string; answer: any },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(`test-${data.testId}`).emit('questionAnswered', {
      questionId: data.questionId,
      userId: client.handshake.query.userId,
    });
  }

  @SubscribeMessage('testCompleted')
  handleTestCompleted(
    @MessageBody() data: { testId: string; score: number },
    @ConnectedSocket() client: Socket,
  ) {
    this.server.to(`test-${data.testId}`).emit('testCompleted', {
      userId: client.handshake.query.userId,
      score: data.score,
    });
  }
}