import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { S3Service } from './s3.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile } from '@nestjs/common/decorators';
import { ValidRoles } from 'src/auth/dto/valid-roles.interface';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('s3')
export class S3Controller {
  constructor(private readonly s3Service: S3Service) {}

  @Post()
  @Auth(ValidRoles.admin)
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type');
    }

    return this.s3Service.create(file);
  }

  @Get(':key')
  findOne(@Param('key') key: string) {
    return this.s3Service.findOne(key);
  }

  @Delete(':id')
  @Auth(ValidRoles.admin)
  remove(@Param('id') id: string) {
    return this.s3Service.remove(id);
  }
}
