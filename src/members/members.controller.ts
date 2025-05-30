import {
  Controller, Post, Body, HttpCode, HttpStatus, Patch,
  UseGuards, Req, UnauthorizedException, BadRequestException,
} from '@nestjs/common';
import { MemberService } from './members.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { LoginMemberDto } from './dto/login-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import * as bcrypt from 'bcrypt';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { LoginRecordsService } from '../login-records/login-records.service';
import { Request } from 'express';


@Controller('members')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly jwtService: JwtService,
    private readonly loginRecordService: LoginRecordsService
  ) { }

  // User Registration
  @Post('signup')
  async signup(@Body() createMemberDto: CreateMemberDto) {
    const { email, password, username } = createMemberDto;

    // Check if email exists
    const existingUser = await this.memberService.findByEmail(email);
    if (existingUser) {
      return {
        statusCode: HttpStatus.CONFLICT,
        message: 'Email already registered',
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await this.memberService.create({
      email,
      password: hashedPassword,
      username,
    });

    return {
      statusCode: HttpStatus.CREATED,
      data: {
        id: user.email,
        username: user.username,
        createdAt: user.createdAt.toISOString(),
      },
    };
  }

  // Login User
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginMemberDto, @Req() request: Request) {
    const { email, password } = loginDto;
    const user = await this.memberService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email };
    const token = this.jwtService.sign(payload, { expiresIn: '20m' });

    // Saving login records,
    await this.loginRecordService.recordLogin(user.id, request.ip ?? '')

    return {
      statusCode: HttpStatus.OK,
      data: {
        accessToken: token,
      },
    };
  }

  // Update profile
  @UseGuards(AuthGuard('jwt'))
  @Patch('profile')
  async updateUser(@Req() req, @Body() updateMemberDto: UpdateMemberDto) {
    const userEmail = req.user.email;

    const updateData: Partial<UpdateMemberDto> = {};

    if (updateMemberDto.username) {
      updateData.username = updateMemberDto.username;
    }

    if (updateMemberDto.password) {
      updateData.password = await bcrypt.hash(updateMemberDto.password, 10);
    }

    if (Object.keys(updateData).length === 0) {
      throw new BadRequestException('No valid fields provided for update.');
    }

    const updatedUser = await this.memberService.update(userEmail, updateData);

    return {
      statusCode: HttpStatus.OK,
      data: {
        id: updatedUser.email,
        username: updatedUser.username,
        updatedAt: new Date().toISOString(),
      },
    };
  }

}

