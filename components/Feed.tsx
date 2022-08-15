import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  getAllPostsState,
  handlePostState,
  searchedPostsState,
  useSSRPostsState,
} from '../recoil/postAtom';
import Input from './Input';
import Post from './Post';
import { Post as PostType } from '../typings';

type FeedProps = { posts: PostType[] };

const Feed: React.FC<FeedProps> = ({ posts }) => {
  const [realtimePosts, setRealtimePosts] = useState<PostType[]>([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);
  const [allPosts, setAllPosts] = useRecoilState(getAllPostsState);
  const [searchedPosts, setSearchedPosts] = useRecoilState(searchedPostsState);

  useEffect(() => {
    if (searchedPosts.length !== 0) {
      setRealtimePosts(searchedPosts);
      setHandlePost(false);
    } else {
      const fetchPosts = async () => {
        const res = await fetch('/api/posts', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const resData = await res.json();
        setRealtimePosts(resData);
        setAllPosts(resData);
        setHandlePost(false);
        setUseSSRPosts(false);
      };
      fetchPosts();
    }
  }, [handlePost]);

  console.log(handlePost);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {searchedPosts.length !== 0 && searchedPosts.length !== allPosts.length && (
        <div className="flex items-center justify-center">
          <button
            onClick={() => {
              setSearchedPosts([]);
              setHandlePost(true);
            }}
          >
            <p>Show all posts</p>
          </button>
        </div>
      )}
      {!useSSRPosts
        ? realtimePosts.map(realtimePost => <Post key={realtimePost._id} post={realtimePost} />)
        : posts.map(post => <Post key={post._id} post={post} />)}
    </div>
  );
};
export default Feed;
