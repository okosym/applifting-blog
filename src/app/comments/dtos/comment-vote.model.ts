// nest
import { IsDate, IsInt, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";
// externals
import { Model } from "objection";
import { v4 as uuid } from 'uuid';
import { CommentVoteIN } from "./comment-vote.dtos";
import { ApiProperty } from "@nestjs/swagger";

export class CommentVoteModel extends Model {
  static tableName = 'commentVote';

  // Properties
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsUUID()
  commentId!: string;

  @ApiProperty()
  @IsInt() @IsNotEmpty()
  type!: number;

  @ApiProperty()
  @IsString() @IsNotEmpty() @MaxLength(200)
  ipAddress!: string;

  @ApiProperty()
  @IsDate()
  createDate!: string;

  // Methods
  $beforeInsert() {
    this.id = uuid();
    this.createDate = new Date().toISOString();
  }

  static create(input: CommentVoteIN): CommentVoteModel {
    const vote = new CommentVoteModel();
    Object.assign(vote, input);
    return vote;
  }
}