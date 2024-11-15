// nest
import { Body, Controller, Param, Post } from "@nestjs/common";
// internals
import { CommentsFacade } from "./comments.facade";
import { CommentIN } from "./dtos/comment.dtos";
import { IdParam } from "../_params/id.param";
import { ApiResponse } from "@nestjs/swagger";

@Controller("comments")
export class CommentsController {
  // Constructor
  constructor(private readonly _commentsFacade: CommentsFacade) {}

  @Post()
  @ApiResponse({ status: 200, type: String, description: "Success response: returns 'id' of inserted comment." }) 
  async insert(@Body() inputDTO: CommentIN): Promise<string> {
    // call facade method
    const id = await this._commentsFacade.insert(inputDTO);

    // return id
    return id;
  }

  @Post(":id/voteUp")
  @ApiResponse({ status: 200, type: Number, description: "Success response: returns actual score." }) 
  async voteUp(@Param() idParam: IdParam): Promise<number> {
    // call facade method
    const score: number = await this._commentsFacade.voteUp(idParam.id);

    // return score
    return score;
  }

  @Post(":id/voteDown")
  @ApiResponse({ status: 200, type: Number, description: "Success response: returns actual score." }) 
  async voteDown(@Param() idParam: IdParam): Promise<number> {
    // call facade method
    const score: number = await this._commentsFacade.voteDown(idParam.id);

    // return score
    return score;
  }
}