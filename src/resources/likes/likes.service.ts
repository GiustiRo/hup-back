import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HydratedDocument, Model } from 'mongoose';
import { MONGO_CONNECTIONS } from 'src/mongo/connections/mongo-connections.interface';
import { Like, LikeDocument } from 'src/mongo/schemas/likes/like.schema';
import { User, UserDocument } from 'src/mongo/schemas/users/user.schema';


@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name, MONGO_CONNECTIONS.USERS) private likeModel: Model<LikeDocument>,
    @InjectModel(User.name, MONGO_CONNECTIONS.USERS) private userModel: Model<UserDocument>,
  ) { }
  addLike() {
    return 'This action adds a new like';
  }

  async findAll(userId: string) {
    let likes = await this.userModel.findOne({ user_id: userId }, { custom_metadata: { likes: 1 } });
    likes = likes.custom_metadata.likes;
    return likes
  }

  findOne(id: number) {
    return `This action returns a #${id} like`;
  }

  update(id: number, updateLikeDto) {
    return `This action updates a #${id} like`;
  }

  remove(id: number) {
    return `This action removes a #${id} like`;
  }
}
