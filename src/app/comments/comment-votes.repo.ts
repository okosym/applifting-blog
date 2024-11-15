// nest
import { Injectable } from "@nestjs/common";
// internals
import { CommentVoteModel } from "./dtos/comment-vote.model";


@Injectable()
export class CommentVotesRepo {
  
  // Methods
  async insert(comment: CommentVoteModel): Promise<void> {
    await CommentVoteModel.query().insert(comment);
  }

  async hasVoted(commentId: string, ipAddress: string): Promise<boolean> {
    const vote = await CommentVoteModel.query().findOne({commentId: commentId, ipAddress: ipAddress});
    return !!vote;
  }
  
}