import { Controller, Get } from '@nestjs/common';
import { LoginRecordsService } from './login-records.service';


@Controller('login-records')
export class LoginRecordsController {
  constructor(private loginRecordsService: LoginRecordsService) { }

  // Fetches login records
  @Get()
  async getLoginRecords() {
    return this.loginRecordsService.getLoginRecords();
  }

  // Fetches weekly rankings of members
  @Get('weekly-rankings')
  async getWeeklyRankings() {
    return this.loginRecordsService.getWeeklyLoginRankings();
  }

}
