import { Test, TestingModule } from '@nestjs/testing';
import { LoginRecordsController } from './login-records.controller';

describe('LoginRecordsController', () => {
  let controller: LoginRecordsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoginRecordsController],
    }).compile();

    controller = module.get<LoginRecordsController>(LoginRecordsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
