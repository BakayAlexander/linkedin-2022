import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { modalMediaContentState, modalState } from '../recoil/modalAtom';
import { handlePostState, searchedPostsState } from '../recoil/postAtom';

const Form: React.FC = () => {
  const [inputValue, setInputValue] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [searchedPosts, setSearchedPosts] = useRecoilState(searchedPostsState);
  const mediaContentType = useRecoilValue(modalMediaContentState);

  const handleUploadPost = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    //While using axios, I should write the whole url localhost:3000/api/....
    const res = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({
        text: inputValue,
        photoUrl: photoUrl,
        videoUrl: videoUrl,
        userName: session?.user?.name,
        email: session?.user?.email,
        userImg: session?.user?.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const resData = await res.json();
    setHandlePost(true);
    setModalOpen(false);
    setSearchedPosts([]);
  };

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/70">
      <textarea
        rows={4}
        placeholder="What do you want to talk about?"
        className="bg-transparent focus:outline-none dark:placeholder-white/70"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      {mediaContentType === 'photo' && (
        <input
          type="text"
          placeholder="Add a photo URL (optional)."
          className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/70"
          value={photoUrl}
          onChange={e => setPhotoUrl(e.target.value)}
        />
      )}
      {mediaContentType === 'video' && (
        <input
          type="text"
          placeholder="Add a YouTube link: https://www.youtube.com/watch?v= "
          className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/70"
          value={videoUrl}
          onChange={e => setVideoUrl(e.target.value)}
        />
      )}
      <button
        type="submit"
        onClick={handleUploadPost}
        disabled={!inputValue.trim() && !photoUrl.trim()}
        className="absolute bottom-0 right-0 rounded-full px-3.5 py-1font-medium bg-blue-400 hover:bg-blue-500 disabled:text-black/40 disabled:bg-white/70 disabled:cursor-not-allowed"
      >
        Post
      </button>
    </form>
  );
};
export default Form;
