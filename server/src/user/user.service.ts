import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDocument } from './entities/user.entity';
import { MyLogger } from 'src/common/log/logger';
import { encodePass } from 'src/common/utils';

@Injectable()
export class UserService {
  loginConfig: any;
  logger: MyLogger
  constructor(
    @InjectModel('User') private userModel: Model<UserDocument>,
  ) {
    this.logger = new MyLogger(UserService.name)
  }
  async login(createUserDto: CreateUserDto) {
    this.logger.log(createUserDto)
    const user = await this.userModel.findOne({
      username: createUserDto.username,
      password: encodePass(createUserDto.password)
    }, {
      password: 0
    }).exec()

    this.logger.log(user)
    return {
      token: 'x',
      user
    }
  }
}
