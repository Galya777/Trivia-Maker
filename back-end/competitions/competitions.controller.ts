import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CompetitionsService } from './competitions.service';
import { JwtGuard } from '../userEngine/jwt.guard';
import { User } from '../src/decorators';

@Controller('competitions')
@UseGuards(JwtGuard)
export class CompetitionsController {
  constructor(private readonly competitionsService: CompetitionsService) {}

  @Get()
  async getCompetitions(@User() user: any) {
    return this.competitionsService.getCompetitions(user);
  }

  @Post()
  async createCompetition(@Body() data: any, @User() user: any) {
    return this.competitionsService.createCompetition(data, user);
  }

  @Get(':id')
  async getCompetition(@Param('id') id: string, @User() user: any) {
    return this.competitionsService.getCompetition(id, user);
  }

  @Put(':id')
  async updateCompetition(@Param('id') id: string, @Body() data: any, @User() user: any) {
    return this.competitionsService.updateCompetition(id, data, user);
  }

  @Delete(':id')
  async deleteCompetition(@Param('id') id: string, @User() user: any) {
    return this.competitionsService.deleteCompetition(id, user);
  }

  @Post(':id/join')
  async joinCompetition(@Param('id') id: string, @Body() data: any, @User() user: any) {
    return this.competitionsService.joinCompetition(id, data.token, user);
  }
}