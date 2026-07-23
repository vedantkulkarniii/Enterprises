import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private prisma: PrismaService) {}

  async findAll() {
    // To be implemented
    return [];
  }

  async findOne(id: string) {
    // To be implemented
    return null;
  }

  async create(data: any) {
    // To be implemented
    return null;
  }
}
