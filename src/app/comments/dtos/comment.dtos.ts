import { PickType } from "@nestjs/swagger";
import { CommentModel } from "./comment.model";

// input DTOs
export class CommentIN extends PickType(CommentModel, ['articleId', 'author', 'content'] as const) {}
// output DTOs
export const CommentForArticleOUT_KEYS = ['id', 'articleId', 'author', 'content', 'score', 'createDate'] as const;
export class CommentForArticleOUT extends PickType(CommentModel, CommentForArticleOUT_KEYS) {}