// nest
import { Injectable } from "@nestjs/common";
// internals
import { AppContext } from "../shared/app.context";
import { AppError } from "../shared/errors/app-error";
import { ArticleModel } from "../articles/dtos/article.model";

@Injectable()
export class AuthGuards {
  constructor(private readonly _appContext: AppContext) {}

  // Methods
  ensureLoggedIn(): void {
    // check if user is logged in
    if (!this._appContext.currentUser) 
      throw AppError.AuthError("User is not logged in.");
  }

  canEditArticle(article: ArticleModel): void {
    // check if user is logged in
    if (!this._appContext.currentUser) 
      throw AppError.AuthError("User is not logged in.");

    // check if article found
    if (!article) 
      throw AppError.ApplicationError("Article not found.");

    // check if user is owner of article
    if (this._appContext.currentUser.id !== article.userId) 
      throw AppError.AuthError("Can't edit article, because user is not owner of article.");
  }
}