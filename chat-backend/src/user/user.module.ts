import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/config/PrismaService';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController]
})
export class UserModule { }
