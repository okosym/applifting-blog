// nest
import { Injectable } from "@nestjs/common";
// internals
import { CommentModel } from "./dtos/comment.model";
import { CommentForArticleOUT, CommentForArticleOUT_KEYS } from "./dtos/comment.dtos";

@Injectable()
export class CommentsRepo {
  
  // Methods
  async insert(comment: CommentModel): Promise<void> {
    await CommentModel.query().insert(comment);
  }

  async findById(id: string): Promise<CommentModel | undefined> {
    return await CommentModel.query().findById(id);
  }

  async update(id: string, updateDTO: Partial<CommentModel>): Promise<void> {
    await CommentModel.query().patchAndFetchById(id, updateDTO);
  }
  
  async getCommentsForArticle(articleId: string): Promise<CommentForArticleOUT[]> {
    return await CommentModel.query()
      .where('articleId', articleId)
      .select(CommentForArticleOUT_KEYS);
  }
}