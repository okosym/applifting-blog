// nest
import { Injectable } from "@nestjs/common";
// internals
import { AppContext } from "../shared/app.context";
import { CommentsRepo } from "./comments.repo";
import { CommentIN } from "./dtos/comment.dtos";
import { CommentModel } from "./dtos/comment.model";
import { AppError } from "../shared/errors/app-error";
import { VoteType } from "./dtos/vote-type";
import { CommentVotesRepo } from "./comment-votes.repo";
import { CommentVoteModel } from "./dtos/comment-vote.model";
import { CommentsGateway } from "./comments.gateway";

@Injectable()
export class CommentsFacade {
  // Constructor
  constructor(private readonly _appContext: AppContext,
    private readonly _commentsRepo: CommentsRepo,
    private readonly _commentVotesRepo: CommentVotesRepo,
    private readonly _commentsGateway: CommentsGateway,
  ) {}
  
  async insert(inputDTO: CommentIN): Promise<string> {
    // create comment
    const comment = new CommentModel();
    Object.assign(comment, inputDTO);

    // insert comment to db
    await this._commentsRepo.insert(comment);

    // EMIT COMMENT_CREATED EVENT
    const commentOUT = comment.toCommentForArticleOUT(comment);
    this._commentsGateway.emitCommentCreatedEvent(commentOUT);

    // return comment id
    return comment.id;
  }

  async voteUp(commentId: string): Promise<number> {
    return await this._vote(commentId, VoteType.Up);
  }

  async voteDown(commentId: string): Promise<number> {
    return await this._vote(commentId, VoteType.Down);
  }

  private async _vote(commentId: string, type: VoteType): Promise<number> {
    // get comment from db
    const comment = await this._commentsRepo.findById(commentId)

    // if not found -> return not found
    if (!comment)
      throw AppError.ApplicationError('Comment not found.');

    // check if ip has already voted
    const ipAddress = this._appContext.ipAddress;
    const voted = await this._commentVotesRepo.hasVoted(commentId, ipAddress);
    if (voted)
      return comment.score;

    // insert commentVote to db
    const vote = CommentVoteModel.create({commentId: commentId, type: type, ipAddress: ipAddress});
    await this._commentVotesRepo.insert(vote);
    // update comment score to db
    comment.score = (type === VoteType.Up)
      ? comment.score++
      : comment.score--;
    await this._commentsRepo.update(commentId, {score: comment.score});

    // EMIT COMMENT_UPVOTED OR COMMENT_DOWNVOTED EVENT
    const commentOUT = comment.toCommentForArticleOUT(comment);
    if (type === VoteType.Up)
      this._commentsGateway.emitCommentUpVotedEvent(commentOUT);
    else
      this._commentsGateway.emitCommentDownVotedEvent(commentOUT);

    // return score
    return comment.score;
  }

}