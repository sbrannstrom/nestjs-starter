import { BadRequestException, Body, Controller, Post, Req, Request, UseGuards } from '@nestjs/common';
import { Organization, Role } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateOrganizationDto } from './organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private orgService: OrganizationService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createOrg(@Body() payload: CreateOrganizationDto, @Request() req): Promise<Organization> {
    const org = await this.orgService.findOne({
      OrgNumber: payload.orgNumber
    })
    if (org || req.user.role !== Role.SUPERUSER) {
      throw new BadRequestException();
    }
    return this.orgService.createOrganization(payload);
  }


}
