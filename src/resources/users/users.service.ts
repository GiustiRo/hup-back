import { BadRequestException, Injectable } from '@nestjs/common';
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
import { StorageService, StorageBuckets } from 'src/storage/storage/storage.service';



@Injectable()
export class UsersService {
  constructor(
    private http: HttpService,
    private configService: ConfigService,
    private storageService: StorageService,
    @InjectModel(User.name, MONGO_CONNECTIONS.USERS) private userModel: Model<UserDocument>
  ) { }
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findOne(url, params, authorization): Promise<UserDocument> {
    // return this.http.get(`${this.configService.get<string>('auth.audience_MGMT_API')}/users/${params.user_id}`,
    //   { headers: { 'Authorization': `${authorization}` } });
    return this.userModel.findOne({ user_id: params.user_id }).exec();
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

  async updatePicture(file, userId, headers) {
    try {
      const pic = await this.storageService.save(
        userId,
        file.mimetype, // this will represent the file extension.
        file.buffer,
        [{ userId: userId }],
        StorageBuckets.AVATARS
      ).then(async (res) => {
        console.warn('storage res: (undefined)', res);
        // Update pic to user profile Auth0 / Mongo.
        let urlPicture = `https://storage.googleapis.com/hup_avatars/${userId}`;
        let urlUpdatePicture = `https://huertup.us.auth0.com/api/v2/users/${userId}`;

        const patchResponse = await this.userModel.findOne({ user_id: userId }).exec();
        // console.warn(patchResponse);
        // patchResponse.$model()
        console.warn(patchResponse.modelName, patchResponse.baseModelName)
        patchResponse.modelName
        patchResponse.picture = urlPicture;
        patchResponse.save();

        // const patchResponse = await this.userModel.updateOne({ user_id: userId }, { $set: { picture: urlPicture } }).exec();
        // const patchResponse = this.userModel.findOneAndUpdate({ user_id: userId }, { $set: { picture: urlPicture } }, { returnDocument: 'after' }, ((err, doc) => {
        //   console.warn(err);
        //   console.warn(doc);
        // }));

        // const patchResponse = await this.http.patch(urlUpdatePicture, {
        //   picture: urlPicture,
        // },
        //   {
        //     headers: {
        //       'Authorization': `${headers?.authorization}`
        //     }
        //   }).toPromise().then(res => {
        //     console.warn('patch response:', res);
        //     return { msg: 'Picture updated successfully!!', urlPicture }
        //   }).catch(err => {
        //     return { msg: err.message || 'Error trying to update your picture.' }
        //   })
        console.warn(patchResponse);
        return patchResponse;
      }).catch(err => {
        console.warn(err);

        // return { msg: err.message || 'Error uploading your picture.' }
        throw new BadRequestException(err.message || 'Error uploading your picture.');
      });
      // return {
      //   msg: 'Foto subida exitosamente!'
      // }
      return pic
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.message || 'Fatal error uploading your picture.');


    }
  }


}
