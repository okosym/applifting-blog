// nest
import { Module } from "@nestjs/common";
import { CommentsController } from "./comments.controller";
import { CommentsFacade } from "./comments.facade";
import { CommentsRepo } from "./comments.repo";
import { SharedModule } from "../shared/shared.module";
import { CommentVotesRepo } from "./comment-votes.repo";
import { CommentsGateway } from "./comments.gateway";

@Module({
  controllers: [CommentsController],
  imports: [SharedModule],
  providers: [CommentsFacade, CommentsRepo, CommentVotesRepo, CommentsGateway],
  exports: [CommentsRepo] 
})
export class CommentsModule {}