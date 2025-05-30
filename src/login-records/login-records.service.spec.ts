import { Test, TestingModule } from '@nestjs/testing';
import { LoginRecordsService } from './login-records.service';

describe('LoginRecordsService', () => {
  let service: LoginRecordsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginRecordsService],
    }).compile();

    service = module.get<LoginRecordsService>(LoginRecordsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
