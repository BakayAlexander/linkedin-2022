import React from 'react';
import Input from './Input';

type FeedProps = {};

const Feed: React.FC<FeedProps> = () => {
  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />
      {/* POSTS */}
    </div>
  );
};
export default Feed;
