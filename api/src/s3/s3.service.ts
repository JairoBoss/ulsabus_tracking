import { Injectable, NotFoundException } from '@nestjs/common';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private readonly client: S3Client;
  private readonly bucketName: string;

  constructor() {
    this.client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
    });
    this.bucketName = process.env.AWS_S3_NAME;
  }

  async create(file: Express.Multer.File) {
    const { originalname, buffer, mimetype } = file;
    const uuid = uuidv4();
    const originalnameReal = `${originalname
      .toLocaleLowerCase()
      .replaceAll("'", '')
      .replaceAll(' ', '_')}_${uuid}`;

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: originalnameReal,
      Body: buffer,
      ContentType: mimetype,
    });

    try {
      const response = await this.client.send(command);
      return {
        id: originalnameReal,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  async findOne(key: string) {
    const url = await this.getSignedUrl(key);
    return { url };
  }

  async remove(key: string) {
    const command = new DeleteObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    try {
      const response = await this.client.send(command);
      console.log(response);
      return { message: 'Imagen eliminada' };
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async getSignedUrl(key: string) {
    const command = new GetObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });
    const signedUrl = await getSignedUrl(this.client, command, {
      expiresIn: 3600,
    });
    return signedUrl;
  }
}
