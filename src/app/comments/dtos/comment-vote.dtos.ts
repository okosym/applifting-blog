import { PickType } from "@nestjs/swagger";
import { CommentVoteModel } from "./comment-vote.model";

// input DTOs
export class CommentVoteIN extends PickType(CommentVoteModel, ['commentId', 'type','ipAddress']) {}