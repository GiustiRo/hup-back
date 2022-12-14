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
  async addLike(like, user_id: string) {
    console.warn('will update user: ', user_id);
    console.warn('with like: ', like);

    await this.userModel.findOneAndUpdate({ user_id }, { $push: { 'custom_metadata.likes': like } });
  }

  async findAll(user_id: string) {
    let likes = await this.userModel.findOne({ user_id }, { custom_metadata: { likes: 1 } });
    likes = likes.custom_metadata.likes;
    return likes
  }

  async update(id: string, body, user_id: string) {
    try {
      console.warn('will updatex: ', id);
      let user = await this.userModel.findOne({ user_id });
      user.custom_metadata.likes = user.custom_metadata.likes.map(l => {
        if (l.itemId == id) l.collectionName = (body?.collectionName || 'Principal');
        return l;
      })
      console.warn(user.custom_metadata.likes)
      await user.save();
      return { message: 'Se actualizó la colección de tu Me Gusta.' }
    } catch (error) {
      console.warn(error);
    }
  }

  async remove(id: string, user_id: string) {
    try {
      console.warn('will remove: ', id);
      let user = await this.userModel.findOne({ user_id });
      user.custom_metadata.likes = user.custom_metadata.likes.filter(l => l.itemId != id);
      console.warn(user.custom_metadata.likes)
      await user.save();
      return { message: 'Se quitó de tus Me Gusta.' }
    } catch (error) {
      console.warn(error);
    }
  }
}
