import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { handlePostState, useSSRPostsState } from '../recoil/postAtom';
import Input from './Input';
import Post from './Post';
import { Post as PostType } from '../typings';

type FeedProps = { posts: PostType[] };

const Feed: React.FC<FeedProps> = ({ posts }) => {
  const [realtimePosts, setRealtimePosts] = useState<PostType[]>([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const resData = await res.json();
      setRealtimePosts(resData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };
    fetchPosts();
  }, [handlePost]);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {!useSSRPosts
        ? realtimePosts.map(realtimePost => <Post key={realtimePost._id} post={realtimePost} />)
        : posts.map(post => <Post key={post._id} post={post} />)}
    </div>
  );
};
export default Feed;
