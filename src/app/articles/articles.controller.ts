// nest
import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
// internal
import { ArticleForGridOUT, ArticleIN } from "./dtos/article.dtos";
import { ArticlesFacade } from "./articles.facade";
import { IdParam } from "../_params/id.param";
import { ArticleOUT } from "./dtos/article.dtos";
import { GridParams } from "../_params/grid.params";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";

@Controller("articles")
export class ArticlesController {
  // Constructor
  constructor(private readonly _articlesFacade: ArticlesFacade) {}

  @Post("insert")
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: String, description: "Success response: returns 'id' of inserted article." })
  async insert(@Body() inputDTO: ArticleIN): Promise<string> {
    // call facade method
    const id = await this._articlesFacade.insert(inputDTO);

    // return id
    return id;
  }

  @Get(":id")
  @ApiResponse({status: 200, type: ArticleOUT, description: "Success response: returns article."})
  async getById(@Param() param: IdParam): Promise<ArticleOUT> {
    // call facade method
    const article = await this._articlesFacade.getById(param.id);

    // return result
    return article;
  }

  @Get()
  @ApiResponse({ status: 200, type: ArticleForGridOUT, isArray: true, description: "Success response: returns list of articles." })
  async getArticlesForGrid(@Query() gridQueryParams: GridParams): Promise<ArticleForGridOUT[]> {
    //call facade method
    const articles = await this._articlesFacade.getArticlesForGrid(gridQueryParams.offset, gridQueryParams.limit);

    // return result
    return articles
  }

  @Post(":id/update")
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Success: article was updated." })
  async update(@Param() param: IdParam,  @Body() inputDTO: ArticleIN): Promise<void> {
    // call facade method
    await this._articlesFacade.update(param.id, inputDTO);
  }

  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: "Success: article was deleted." })
  @Post(":id/delete")
  async delete(@Param() param: IdParam): Promise<void> {
    // call facade method
    await this._articlesFacade.delete(param.id);
  }

}
