// nest
import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
// externals
import { Model } from "objection";
import { v4 as uuid } from 'uuid';

export class ArticleModel extends Model {
  static tableName = 'article';

  // Properties
  @ApiProperty()
  @IsUUID()
  id!: string;

  @ApiProperty()
  @IsUUID()
  userId!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() @MaxLength(200)
  title!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() @MaxLength(2000)
  perex!: string;

  @ApiProperty()
  @IsString() @IsNotEmpty() @MaxLength(10000)
  content!: string;

  @ApiProperty()
  @IsOptional() @IsUUID()
  imageId?: string;

  @ApiProperty()
  @IsDate()
  createDate!: string;

  @ApiProperty()
  @IsDate()
  changeDate!: string;

  // Methods
  $beforeInsert() {
    this.id = uuid();
    const now = new Date().toISOString();
    this.createDate = now;
    this.changeDate = now;
  }

  $beforeUpdate() {
    this.changeDate = new Date().toISOString();
  }
}
