// nest
import { Injectable } from "@nestjs/common";
// internals
import { AppError } from "../shared/errors/app-error";
import { AppContext } from "../shared/app.context";
import { AuthGuards as AuthGuards } from "../auth/auth.guards";
import { ArticleForGridOUT as ArticleForGridOUT, ArticleIN } from "./dtos/article.dtos";
import { ArticleModel } from "./dtos/article.model";
import { ArticlesRepo } from "./articles.repo";
import { ArticleOUT } from "./dtos/article.dtos";
import { CommentsRepo } from "../comments/comments.repo";
import { CommentForArticleOUT } from "../comments/dtos/comment.dtos";

@Injectable()
export class ArticlesFacade {
  
  // Constructor
  constructor(private readonly _authGuards: AuthGuards,
    private readonly _appContext: AppContext,
    private readonly _articlesRepo: ArticlesRepo,
    private readonly _commentsRepo: CommentsRepo,
  ) {}

  // Methods
  async insert(inputDTO: ArticleIN): Promise<string> {
    // authorization guard
    this._authGuards.ensureLoggedIn();
    
    // get current user
    let currentUser = this._appContext.currentUser; // not null as per guard above

    // create article
    const article = new ArticleModel();
    Object.assign(article, inputDTO);
    article.userId = currentUser.id;

    // insert article to db
    await this._articlesRepo.insert(article);

    // return article id
    return article.id;
  }

  async getById(id: string): Promise<ArticleOUT> {
    // get article from db
    const art = await this._articlesRepo.findById(id);

    // if not found -> return not found
    if (!art)
      throw AppError.ApplicationError('Article not found.');

    // get comments for article
    const comments: CommentForArticleOUT[] = await this._commentsRepo.getCommentsForArticle(id);

    // map to outputDTO
    const outputDTO: ArticleOUT = {
      id: art.id,
      title: art.title,
      perex: art.perex,
      content: art.content,
      imageId: art.imageId,
      createDate: art.createDate,
      changeDate: art.changeDate,
      comments: comments
    };
    
    // return result
    return outputDTO;
  }

  async getArticlesForGrid(offset: number, limit?: number): Promise<ArticleForGridOUT[]> {
    // get articles from db
    const articlesForGrid = await this._articlesRepo.getArticlesForGrid(offset, limit);
    
    // return result
    return articlesForGrid;
  }

  async update(id: string, inputDTO: ArticleIN): Promise<void> {
    // authorization guard
    this._authGuards.ensureLoggedIn();
    
    // get article from db
    const art = await this._articlesRepo.findById(id);

    // authorization guard
    this._authGuards.canEditArticle(art);

    // do update
    await this._articlesRepo.update(id, inputDTO);
  }

  async delete(id: string): Promise<void> {
    // authorization guard
    this._authGuards.ensureLoggedIn();
    
    // get article from db
    const art = await this._articlesRepo.findById(id);

    // authorization guard
    this._authGuards.canEditArticle(art);

    // do delete
    await this._articlesRepo.delete(id);
  }
}
