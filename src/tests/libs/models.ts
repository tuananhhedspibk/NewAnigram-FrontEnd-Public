import mongoose from 'mongoose';

import { PostSchema, SuggestFriendSchema, UserSchema } from './schemas';

export const UserModel = mongoose.model('User', UserSchema);
export const PostModel = mongoose.model('Post', PostSchema);
export const SuggestFriendModel = mongoose.model(
  'SuggestFriend', SuggestFriendSchema
);
