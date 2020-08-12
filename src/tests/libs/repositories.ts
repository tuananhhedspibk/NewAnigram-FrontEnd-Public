import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

import { PostModel, SuggestFriendModel, UserModel } from './models';

import {
  closeDBConnection,
  connectToDB,
} from '../utils/mongoDBDriver';
import { SALT_ROUNDS } from '../utils/constants';

export class UserRepository {
  static create = async (email: string, password: string): Promise<any> => {
    await connectToDB();

    const currentTimeStamp = new Date();

    const salt = bcrypt.genSaltSync(SALT_ROUNDS);
    const passwordHash = bcrypt.hashSync(password, salt);

    const user = new UserModel({
      email,
      password: passwordHash,
      userName: email,
      nickName: email,
      active: true,
      createdAt: currentTimeStamp,
      updatedAt: currentTimeStamp,
    });

    await user.save();

    await closeDBConnection();

    return user;
  } 
}

export class PostRepository {
  static create = async (
    id: string,
    content: string,
    tags: string[],
    images: string[],
    contextUser: any,
  ) => {
    await connectToDB();

    const currentTimeStamp = new Date();

    const postImages = images.map(imgSrc => ({
      source: imgSrc
    }));

    const post = new PostModel({
      _id: new ObjectId(id),
      content,
      images: postImages,
      tags,
      user: contextUser,
      createdAt: currentTimeStamp,
      updatedAt: currentTimeStamp,
    });
    
    await post.save()
      .then(async result => {
        const post = result;

        contextUser.posts.push(post.id);
        await contextUser.save();
      })
      .catch(err => {
        console.error(err);
      });

    await closeDBConnection();

    return post;
  }
}

export class SuggestFriendRepository {
  static create = async (
    ownerId: string,
    suggestUsersData: any,
  ) => {
    await connectToDB();

    const currentTimeStamp = new Date();
    const suggestUserIds = suggestUsersData.map((userData: any) => (
      userData.id  
    ));

    const suggestFriend = new SuggestFriendModel({
      owner: ownerId,
      users: suggestUserIds,
      createdAt: currentTimeStamp,
      updatedAt: currentTimeStamp,
    });

    await suggestFriend.save();

    await closeDBConnection();
  }
}
