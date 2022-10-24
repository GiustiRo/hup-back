import { HttpService, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AxiosResponse } from 'axios'
import { ConfigService } from '@nestjs/config';
import { accessToken } from 'src/common/interfaces/json-object.interface';
import { map } from 'rxjs/operators';


@Injectable()
export class UsersService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,

  ) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findOne(url, params, authorization): Observable<AxiosResponse> {
    return this.http.get(`${this.configService.get<string>('auth.audience_MGMT_API')}/users/${params.user_id}`,
      { headers: { 'Authorization': `${authorization}` } })
  }

  findAll() {
    return `This action returns all users`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }


}
