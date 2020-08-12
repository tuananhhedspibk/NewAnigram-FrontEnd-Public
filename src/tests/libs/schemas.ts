import { Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: {
    type: Schema.Types.String,
    unique: true,
    required: true,
  },
  password: {
    type: Schema.Types.String,
    required: true,
  },
  userName: {
    type: Schema.Types.String,
    required: true,
  },
  nickName: {
    type: Schema.Types.String,
    required: true,
  },
  gender: {
    type: Schema.Types.String,
    default: 'male',
  },
  avatarURL: {
    type: Schema.Types.String,
    default: '',
  },
  active: {
    type: Schema.Types.Boolean,
    default: false,
  },
  posts: [{
    type: Schema.Types.ObjectId,
    required: true,
  }],
  followers: [{
    type: Schema.Types.ObjectId,
    required: true,
  }],
  followings: [{
    type: Schema.Types.ObjectId,
    required: true,
  }],
  createdAt: { type: Schema.Types.Date },
  updatedAt: { type: Schema.Types.Date },
});

export const PostSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  content: {
    type: Schema.Types.String,
    required: true,
  },
  numberLikes: {
    type: Schema.Types.Number,
    default: 0
  },
  numberComments: {
    type: Schema.Types.Number,
    default: 0
  },
  images: {
    type: [{
      source: { type: Schema.Types.String },
    }],
    required: true,
  },
  tags: { type: [ Schema.Types.String ] },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  comments: [{
    type: Schema.Types.ObjectId,
    required: true,
  }],
  createdAt: { type: Schema.Types.Date },
  updatedAt: { type: Schema.Types.Date },
});

export const SuggestFriendSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  users: {
    type: [ Schema.Types.ObjectId ],
    required: true,
  },
  createdAt: { type: Schema.Types.Date },
  updatedAt: { type: Schema.Types.Date },
});
