import { Avatar } from '@mui/material';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Toaster } from 'react-hot-toast';
import useHoatToast from '../utils/useHoatToast';

// interface Session {
//   user?: {
//     name?: string;
//     address?: string;
//     image?: string;
//   };
// }

const Sidebar: React.FC = () => {
  const { data: session } = useSession();

  return (
    <div className="space-y-2 min-w-max">
      <div className="bg-white dark:bg-[#1d2226] overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none rounded-lg">
        <div className="relative w-full h-14">
          <Image src="https://rb.gy/i26zak" alt="LinkedIn logo" layout="fill" priority />
        </div>
        <Avatar
          onClick={signOut}
          // @ts-ignore
          src={session!.user!.image}
          className="!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer"
        />
        <div className="mt-5 py-4 space-x-0.5">
          <h4 className="hover:underline decoration-[#a3ffd5] underline-offset-1 cursor-pointer">
            {session!.user!.name}
          </h4>
          <p className="text-black/60 dark:text-white/70 text-sm">{session!.user!.email}</p>
        </div>
        <div className="hidden md:inline text-left dark:text-white/70 text-sm">
          <div className="font-medium space-y-0.5 dark:border-t border-gray-600 py-3 px-4 ">
            <div className="sidebar__button" onClick={useHoatToast}>
              <h4>Who viewed your profile</h4>
              <span className="text-blue-500">303</span>
            </div>
            <div className="sidebar__button" onClick={useHoatToast}>
              <h4>Views of your post</h4>
              <span className="text-blue-500">1,002</span>
            </div>
          </div>
          <div className="font-medium space-y-0.5 dark:border-t border-gray-600 py-3 px-4 ">
            <h4 className="leading-4 text-xs">Access exclusive tools & insights</h4>
            <div className="sidebar__button" onClick={useHoatToast}>
              <h4 className="dark:text-white font-medium">
                <span className="w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1" />{' '}
                Try Premium for free
              </h4>
            </div>
          </div>
          <div className="font-medium space-y-0.5 dark:border-t border-gray-600 py-3 px-4 flex items-center space-x-1.5">
            <div className="sidebar__button" onClick={useHoatToast}>
              <BookmarkOutlinedIcon className="!-ml-1" />
              <h4 className="dark:text-white font-medium">My items</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex bg-white dark:bg-[#1d2226] text-black/60 dark:text-white/70 overflow-hidden flex-col space-y-2 pt-2.5 rounded-lg sticky top-2.5 border border-gray-300 dark:border-none">
        <p className="sidebar__link" onClick={useHoatToast}>
          Groups
        </p>
        <div className="flex items-center justify-between">
          <p className="sidebar__link" onClick={useHoatToast}>
            Events
          </p>
          <AddRoundedIcon className="!h-5" />
        </div>
        <p className="sidebar__link" onClick={useHoatToast}>
          Followed Hashtags
        </p>
        <div className="font-medium space-y-0.5 dark:border-t border-gray-600 py-3 px-4 space-x-1.5 text-center cursor-pointer opacity-80 hover:opacity-100">
          <h4 className="dark:text-white font-medium text-sm" onClick={useHoatToast}>
            Discover More
          </h4>
        </div>
      </div>
      <Toaster position="bottom-center" />
    </div>
  );
};
export default Sidebar;
