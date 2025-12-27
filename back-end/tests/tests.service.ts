import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';
import { ActiveTestsGateway } from '../active-tests/active-tests.gateway';

@Injectable()
export class TestsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly activeTestsGateway: ActiveTestsGateway,
  ) {}

  async getTests(user) {
    // Return tests based on user role
    if (user.role.role === 'admin') {
      return this.prisma.tests.findMany({
        include: {
          createdBy: true,
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });
    } else {
      return this.prisma.tests.findMany({
        where: {
          OR: [
            { isPublic: true },
            { userId: user.id },
            { isPremium: false }, // assuming premium check
          ],
        },
        include: {
          createdBy: true,
          questions: {
            include: {
              answers: true,
            },
          },
        },
      });
    }
  }

  async createTest(data, user) {
    return this.prisma.tests.create({
      data: {
        ...data,
        userId: user.id,
        questions: {
          create: data.questions,
        },
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
  }

  async getTest(id, user) {
    return this.prisma.tests.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
  }

  async updateTest(id, data, user) {
    return this.prisma.tests.update({
      where: { id },
      data,
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
      },
    });
  }

  async deleteTest(id, user) {
    return this.prisma.tests.delete({
      where: { id },
    });
  }

  async getTestResults(id, user) {
    return this.prisma.testResults.findMany({
      where: { testId: id },
      include: {
        user: true,
      },
    });
  }

  async submitResult(id, data, user) {
    const result = await this.prisma.testResults.create({
      data: {
        testId: id,
        userId: user.id,
        score: data.score,
        answers: data.answers,
      },
    });
    // Emit real-time event
    this.activeTestsGateway.server.to(`test-${id}`).emit('testCompleted', {
      userId: user.id,
      score: data.score,
    });
    return result;
  }
}