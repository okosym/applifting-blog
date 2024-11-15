// nest
import { IsDate, IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength } from "class-validator";
// externals
import { Model } from "objection";
import { v4 as uuid } from 'uuid';
import { CommentForArticleOUT } from "./comment.dtos";
import { ApiProperty } from "@nestjs/swagger";

export class CommentModel extends Model {
  static tableName = 'comment';

  // Properties
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsUUID()
  articleId!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() @MaxLength(200)
  author!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() @MaxLength(2000)
  content!: string;

  @ApiProperty()
  @IsNumber()
  score!: number;

  @ApiProperty()
  @IsDate()
  createDate!: string;

  // Methods
  $beforeInsert() {
    this.id = uuid();
    this.createDate = new Date().toISOString();
    this.score = 0;
  }

  toCommentForArticleOUT(comment: CommentModel) {
    const outputDTO: CommentForArticleOUT = {
      id: comment.id,
      articleId: comment.articleId,
      author: comment.author,
      content: comment.content,
      score: comment.score,
      createDate: comment.createDate
    };
    return outputDTO;
  }
}