import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { TestsService } from './tests.service';
import { JwtGuard } from '../userEngine/jwt.guard';
import { User } from '../src/decorators';

@Controller('tests')
@UseGuards(JwtGuard)
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Get()
  async getTests(@User() user) {
    return this.testsService.getTests(user);
  }

  @Post()
  async createTest(@Body() data, @User() user) {
    return this.testsService.createTest(data, user);
  }

  @Get(':id')
  async getTest(@Param('id') id: string, @User() user) {
    return this.testsService.getTest(id, user);
  }

  @Put(':id')
  async updateTest(@Param('id') id: string, @Body() data, @User() user) {
    return this.testsService.updateTest(id, data, user);
  }

  @Delete(':id')
  async deleteTest(@Param('id') id: string, @User() user) {
    return this.testsService.deleteTest(id, user);
  }

  @Get(':id/results')
  async getTestResults(@Param('id') id: string, @User() user) {
    return this.testsService.getTestResults(id, user);
  }

  @Post(':id/results')
  async submitResult(@Param('id') id: string, @Body() data, @User() user) {
    return this.testsService.submitResult(id, data, user);
  }

  @Get('leaderboard/global')
  async getLeaderboard() {
    return this.testsService.getLeaderboard();
  }

  @Get('stats/:userId')
  async getUserStats(@Param('userId') userId: string) {
    return this.testsService.getUserStats(userId);
  }
}