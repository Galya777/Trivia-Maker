import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TestsModule } from './tests/tests.module';
import { CompetitionsModule } from './competitions/competitions.module';
import { ActiveTestsModule } from './active-tests/active-tests.module';
import { UsersEngine } from './userEngine/userEngine.module';
import { JwtGuard } from './userEngine/jwt.guard';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UsersEngine,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TestsModule,
    CompetitionsModule,
    ActiveTestsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '../public'),
      serveRoot: '/public/',
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule {}