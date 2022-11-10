import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpService } from '@nestjs/axios'
import { ConfigService } from '@nestjs/config';
import { accessToken } from 'src/common/interfaces/json-object.interface';
import { map } from 'rxjs/operators';
import { AxiosResponse } from 'axios'
import { MONGO_CONNECTIONS } from 'src/mongo/connections/mongo-connections.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/mongo/schemas/users/user.schema';
import { Model } from 'mongoose';


@Injectable()
export class UsersService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
    @InjectModel(User.name, MONGO_CONNECTIONS.USERS) private userModel: Model<UserDocument>
  ) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findOne(url, params, authorization): Observable<AxiosResponse> {
    return this.http.get(`${this.configService.get<string>('auth.audience_MGMT_API')}/users/${params.user_id}`,
      { headers: { 'Authorization': `${authorization}` } })
  }

  async findAll() {
    const result = await this.userModel.find();
    console.warn(result);

    return result;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


}
