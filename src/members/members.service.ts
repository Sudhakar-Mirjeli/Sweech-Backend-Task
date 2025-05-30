import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // Adjust path based on your project structure
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(private readonly prisma: PrismaService) { }

  // Find member by mail.
  async findByEmail(email: string) {
    return this.prisma.member.findUnique({
      where: { email },
    });
  }

  // Creating member.
  async create(createMemberDto: CreateMemberDto) {
    const { email, password, username } = createMemberDto;
    return this.prisma.member.create({
      data: {
        email,
        password,
        username,
      },
    });
  }

  // Updating member profile data.
  async update(email: string, data: UpdateMemberDto) {
    const existingUser = await this.prisma.member.findUnique({ where: { email } });

    if (!existingUser) {
      throw new NotFoundException('User not found');
    }
    return this.prisma.member.update({
      where: { email },
      data,
    });
  }
}
