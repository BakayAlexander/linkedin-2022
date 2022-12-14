/* eslint-disable @next/next/no-img-element */
import { Avatar, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { Post } from '../typings';
import { modalState, modalTypeState } from '../recoil/modalAtom';
import { useRecoilState } from 'recoil';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import ReplyRoundedIcon from '@mui/icons-material/ReplyRounded';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ThumbUpOffAltOutlinedIcon from '@mui/icons-material/ThumbUpOffAltOutlined';
import ThumbUpOffAltRoundedIcon from '@mui/icons-material/ThumbUpOffAltRounded';
import { getPostState, handlePostState } from '../recoil/postAtom';
import { useSession } from 'next-auth/react';
import TimeAgo from 'timeago-react';
import { toastState } from '../recoil/toastAtom';
import ReactPlayer from 'react-player';

type PostProps = { post: Post; modalPost?: any };

const Post: React.FC<PostProps> = ({ post, modalPost }) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [liked, setLiked] = useState(false);
  const [showAllText, setShowAllText] = useState(false);
  const { data: session } = useSession();
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [toastShown, setToastShown] = useRecoilState(toastState);

  const truncate = (string: string, n: number) =>
    string?.length > n ? string.substr(0, n - 1) + ' ...see more' : string;

  const deletePost = async () => {
    const response = await fetch(`api/posts/${post._id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    setHandlePost(true);
    setModalOpen(false);
  };

  const handleLike = async () => {
    // const response = await fetch(`api/posts/${post._id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    // });
    setHandlePost(true);
    setModalOpen(false);
    setLiked(!liked);
    setToastShown(true);
  };

  return (
    <div
      className={`${
        modalPost ? '!rounded-r-lg' : 'rounded-lg'
      } bg-white dark:bg-[#1d2226] space-y-2 py-2.5 border-gray-300 dark:border-none`}
    >
      <div className="flex items-center px-2.5 cursor-pointer">
        <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500">{post.userName}</h6>
          <p className="text-sm dark:text-white/75 opacity-80">{post.email}</p>
          <TimeAgo datetime={post.createdAt} className="text-xs dark:text-white/75 opacity-80" />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton onClick={() => setToastShown(true)}>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>
      {post.text && (
        <div className="px-2.5 break-all md:break-normal">
          {modalPost || showAllText ? (
            <p onClick={() => setShowAllText(false)}>{post.text}</p>
          ) : (
            <p onClick={() => setShowAllText(true)}>{truncate(post.text, 150)}</p>
          )}
        </div>
      )}
      {post.photoUrl && !modalPost && (
        <img
          src={post.photoUrl}
          alt="Post image"
          className="w-full cursor-pointer flex flex-col justify-center"
          onClick={() => {
            setModalOpen(true);
            setModalType('gifYouUp');
            setPostState(post);
          }}
        />
      )}
      {post.videoUrl && !modalPost && <ReactPlayer url={post.videoUrl} width="100%" controls />}
      <div className="flex justify-evenly items-center dark:border-t border-gray-600 mx-2.5 pt-2 text-black/60 dark:text-white/80">
        {modalPost ? (
          <button className="post__button">
            <CommentOutlinedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button className={`post__button ${liked && 'text-blue-500'}`} onClick={handleLike}>
            {liked ? (
              <ThumbUpOffAltRoundedIcon />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}

            <h4>Like</h4>
          </button>
        )}
        {session?.user?.email === post.email ? (
          <button className="post__button focus:text-red-400" onClick={deletePost}>
            <DeleteRoundedIcon />
            <h4>Delete post</h4>
          </button>
        ) : (
          <button className="post__button" onClick={() => setToastShown(true)}>
            <ReplyRoundedIcon className="-scale-x-100" />
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
};
export default Post;
