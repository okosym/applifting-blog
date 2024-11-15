// nest
import { Injectable } from '@nestjs/common';
// internals
import { ArticleModel } from './dtos/article.model';
import { ArticleForGridOUT as ArticleForGridOUT, ArticleForGridOUT_KEYS } from './dtos/article.dtos';

@Injectable()
export class ArticlesRepo {

  // Methods
  async insert(article: ArticleModel): Promise<void> {
    await ArticleModel.query().insert(article);
  }

  async findById(id: string): Promise<ArticleModel | undefined> {
    return await ArticleModel.query().findById(id);
  }

  async update(id: string, updateDTO: Partial<ArticleModel>): Promise<void> {
    await ArticleModel.query().patchAndFetchById(id, updateDTO);
  }

  async delete(id: string): Promise<void> {
    await ArticleModel.query().deleteById(id);
  }

  async getArticlesForGrid_OLD(offset: number, limit?: number): Promise<ArticleForGridOUT[]> {
    const columns: (keyof ArticleForGridOUT)[] = ['id', 'title', 'perex'];

    const query = ArticleModel.query()
      .offset(offset)
      .select(columns);

    if (limit) 
      query.limit(limit);
      
    return await query;
  }

  async getArticlesForGrid(offset: number, limit?: number): Promise<ArticleForGridOUT[]> {
    const query = ArticleModel.query()
      .select(ArticleForGridOUT_KEYS)
      .offset(offset);

    if (limit) 
      query.limit(limit);
      
    return await query;
  }
  
}