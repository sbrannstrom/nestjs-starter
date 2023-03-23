import { Injectable } from '@nestjs/common';
import { Organization, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) { }

  async findOne(
    userWhereUniqueInput: Prisma.OrganizationWhereUniqueInput,
  ): Promise<Organization | null> {
    return this.prisma.organization.findUnique({
      where: userWhereUniqueInput,
      include: {
        users: false
      }
    });
  }

  async findOneWithUsers(
    userWhereUniqueInput: Prisma.OrganizationWhereUniqueInput,
  ): Promise<Organization | null> {
    return this.prisma.organization.findUnique({
      where: userWhereUniqueInput,
      include: {
        users: true
      }
    });
  }

  async createOrganization(
    data: Prisma.OrganizationCreateInput,
  ): Promise<Organization> {
    return await this.prisma.organization.create({
      data
    });
  }
}
