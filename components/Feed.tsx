import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import Input from './Input';

type FeedProps = {};

const Feed: React.FC<FeedProps> = () => {
  const [realtimePosts, setRealtimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostState);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const resData = await res.json();
      setRealtimePosts(resData);
    };
    fetchPosts();
  }, []);

  console.log(realtimePosts);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/* POSTS */}
    </div>
  );
};
export default Feed;
