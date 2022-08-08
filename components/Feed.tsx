import React, { useEffect, useState } from 'react';
import Input from './Input';

type FeedProps = {};

const Feed: React.FC<FeedProps> = () => {
  const [realtimePosts, setRealtimePosts] = useState([]);

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
