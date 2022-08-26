import { Injectable } from '@nestjs/common';
import { IUser } from 'src/interfaces/user.interface';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<IUser> {
    return this.prisma.users.findUnique({
      where: {
        email,
      },
    });
  }

  async register(data: IUser) {
    const user: IUser = await this.prisma.users.create({
      data: {
        ...data,
        role: {
          connect: { role: 'user' },
        },
      },
    });

    return user;
  }

  async profile(user: IUser): Promise<IUser> {
    const profile: IUser = await this.prisma.users.findUnique({
      where: {
        email: user.email,
      },
    });

    return profile;
  }
}
