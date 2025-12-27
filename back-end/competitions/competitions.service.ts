import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';

@Injectable()
export class CompetitionsService {
  constructor(private readonly prisma: PrismaService) {}

  async getCompetitions(user: any) {
    if (user.role.role === 'admin') {
      return this.prisma.competitions.findMany({
        include: {
          createdBy: true,
          players: {
            include: {
              user: true,
            },
          },
          competitionTests: {
            include: {
              test: true,
            },
          },
        },
      });
    } else {
      return this.prisma.competitions.findMany({
        where: {
          OR: [
            { userId: user.id },
            {
              players: {
                some: {
                  userId: user.id,
                },
              },
            },
          ],
        },
        include: {
          createdBy: true,
          players: {
            include: {
              user: true,
            },
          },
          competitionTests: {
            include: {
              test: true,
            },
          },
        },
      });
    }
  }

  async createCompetition(data: any, user: any) {
    return this.prisma.competitions.create({
      data: {
        ...data,
        userId: user.id,
      },
      include: {
        players: true,
        competitionTests: {
          include: {
            test: true,
          },
        },
      },
    });
  }

  async getCompetition(id: string, user: any) {
    return this.prisma.competitions.findUnique({
      where: { id },
      include: {
        createdBy: true,
        players: {
          include: {
            user: true,
          },
        },
        competitionTests: {
          include: {
            test: true,
          },
        },
      },
    });
  }

  async updateCompetition(id: string, data: any, user: any) {
    return this.prisma.competitions.update({
      where: { id },
      data,
      include: {
        players: true,
        competitionTests: {
          include: {
            test: true,
          },
        },
      },
    });
  }

  async deleteCompetition(id: string, user: any) {
    return this.prisma.competitions.delete({
      where: { id },
    });
  }

  async joinCompetition(id: string, token: string, user: any) {
    const competition = await this.prisma.competitions.findUnique({
      where: { token },
    });
    if (!competition || competition.id !== id) {
      throw new Error('Invalid token');
    }
    return this.prisma.competitionPlayers.create({
      data: {
        competitionId: id,
        userId: user.id,
      },
    });
  }
}