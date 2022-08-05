import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import HeaderLink from './HeaderLink';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import { Avatar } from '@mui/material';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const spring = {
  type: 'spring',
  stiffness: 700,
  damping: 30,
};

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  //After mounting we get access to the theme. I use this sheme, because of SSR.
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="sticky top-0 z-40 flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg bg-white dark:!bg-[#1D2226]">
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {mounted && (
          <>
            {theme === 'dark' ? (
              <Image src="https://rb.gy/bizvqj" alt="LinkedIn logo" width={45} height={45} />
            ) : (
              <Image src="https://rb.gy/dpmd9s" alt="LinkedIn logo" width={55} height={55} />
            )}
          </>
        )}

        <div className="flex items-center space-x-1 py-2.5 px-4 rounded w-full dark:md:bg-gray-700">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 flex-grow dark:!placeholder-white/75"
          />
        </div>
      </div>

      <div className="flex items-center space-x-6">
        <HeaderLink icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink icon={GroupIcon} text="My Network" feed />
        <HeaderLink icon={BusinessCenterIcon} text="Jobs" feed hidden />
        <HeaderLink icon={ChatIcon} text="Messaging" feed />
        <HeaderLink icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink icon={AppsOutlinedIcon} text="Work" feed hidden />

        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              theme === 'dark' ? 'justify-end' : 'justify-start'
            }`}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <span className="absolute left-0">🌜</span>
            <motion.div className="w-5 h-5 bg-white rounded-full z-40" layout transition={spring} />
            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  );
};
export default Header;
