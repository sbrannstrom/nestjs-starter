import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { OrganizationModule } from './organization/organization.module';

@Module({
  imports: [UserModule, AuthModule, OrganizationModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
