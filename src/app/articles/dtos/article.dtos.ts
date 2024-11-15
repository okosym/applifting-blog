// nest, objection
import { PickType } from "@nestjs/swagger";
// internals
import { ArticleModel } from "./article.model";
import { CommentForArticleOUT } from "../../comments/dtos/comment.dtos";

// input DTOs
export class ArticleIN extends PickType(ArticleModel, ['title', 'perex', 'content', 'imageId']) {}

// output DTOs
export class ArticleOUT extends PickType(ArticleModel, ['id', 'title', 'perex', 'content', 'imageId', 'createDate', 'changeDate']) {
  comments: CommentForArticleOUT[];
}
export const ArticleForGridOUT_KEYS = ['id', 'title', 'perex'] as const;
export class ArticleForGridOUT extends PickType(ArticleModel, ArticleForGridOUT_KEYS) {}
