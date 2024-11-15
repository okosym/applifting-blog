// nest
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
// knex
import { Model } from "objection";
import Knex from "knex";
// internals
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // setup Swagger
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('The Blog API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // setup Knex (Objection)
  const knex = Knex({
    client: "sqlite3",
    connection: { filename: "./db/blog.db" },
    useNullAsDefault: true,
  });
  Model.knex(knex);

  await app.listen(3000);
}
bootstrap();
