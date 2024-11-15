// externals
import { MessageBody, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
// internals
import { CommentForArticleOUT } from "./dtos/comment.dtos";

@WebSocketGateway()
export class CommentsGateway {
  @WebSocketServer() server: Server;

  //@SubscribeMessage('commentCreated')
  emitCommentCreatedEvent(@MessageBody() commentOUT: CommentForArticleOUT) {
    this.server.emit('commentCreated', commentOUT);
  }

  //@SubscribeMessage('commentUpVoted')
  emitCommentUpVotedEvent(@MessageBody() commentOUT: CommentForArticleOUT) {
    this.server.emit('commentUpVoted', commentOUT);
  }

  //@SubscribeMessage('commentDownVoted')
  emitCommentDownVotedEvent(@MessageBody() commentOUT: CommentForArticleOUT) {
    this.server.emit('commentDownVoted', commentOUT);
  }
}