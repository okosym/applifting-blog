// nest
import { Module } from "@nestjs/common";
// internals
import { SharedModule } from "../shared/shared.module";
import { ArticlesController } from "./articles.controller";
import { ArticlesFacade } from "./articles.facade";
import { AuthModule } from "../auth/auth.module";
import { ArticlesRepo } from "./articles.repo";
import { CommentsModule } from "../comments/comments.module";

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesFacade, ArticlesRepo],
  imports: [SharedModule, AuthModule, CommentsModule],
})
export class ArticlesModule {}