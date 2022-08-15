import { atom } from 'recoil';
import { Post } from '../typings';

export const handlePostState = atom({
  key: 'handlePostState',
  default: false,
});

export const getPostState = atom({
  key: 'getPostState',
  default: {},
});

export const useSSRPostsState = atom({
  key: 'useSSRPostsState',
  default: true,
});

export const getAllPostsState = atom<Post[]>({
  key: 'getAllPostsState',
  default: [],
});

export const searchedPostsState = atom<Post[]>({
  key: 'searchedPostsState',
  default: [],
});
