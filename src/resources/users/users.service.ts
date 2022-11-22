import { BadRequestException, Injectable } from '@nestjs/common';
import { MONGO_CONNECTIONS } from 'src/mongo/connections/mongo-connections.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/mongo/schemas/users/user.schema';
import { Model } from 'mongoose';
import { StorageService, StorageBuckets, StorageMymeTypeDicc } from 'src/storage/storage/storage.service';

@Injectable()
export class UsersService {
  constructor(
    private storageService: StorageService,
    @InjectModel(User.name, MONGO_CONNECTIONS.USERS) private userModel: Model<UserDocument>
  ) { }

  async findOne(params): Promise<UserDocument> {
    return await this.userModel.findOne({ user_id: params.user_id });
  }

  async findAll() {
    return await this.userModel.find();
  }

  async update(user_id: string, updateUserDto: Partial<UserDocument>) {
    await this.userModel.findByIdAndUpdate(user_id, { ...updateUserDto }, { returnDocument: 'after' })
    return { message: 'Tus datos se actualizaron con éxito!' };;
  }

  async updatePicture(file, userId: string) {
    try {
      console.warn(file.mimetype);
      const pic = this.storageService.save(
        userId,
        file.mimetype,
        file.buffer,
        null, // [{ user_id: userId }],
        [{ cacheControl: 'no-store' }],
        StorageBuckets.AVATARS
      ).then(async (res) => {
        // Update pic to user profile Auth0 / Mongo. (Auth gives problems if idp != auth0).
        let urlPicture = `https://storage.googleapis.com/hup_avatars/${userId}.${StorageMymeTypeDicc[file.mimetype]}`;
        const patchResponse = await this.userModel.findOne({ user_id: userId });
        patchResponse.picture = urlPicture;
        patchResponse.save();
        console.warn(patchResponse);
        return { message: 'Foto actualizada con éxito!' };
      }).catch(err => {
        console.warn(err);
        throw new BadRequestException(err.message || 'Error uploading your picture.');
      });
      return pic
    } catch (error) {
      console.log(error)
      throw new BadRequestException(error.message || 'Fatal error uploading your picture.');


    }
  }

  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }

}
