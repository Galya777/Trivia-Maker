import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TestsModule } from './tests/tests.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    UserEngineModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TestsModule,
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