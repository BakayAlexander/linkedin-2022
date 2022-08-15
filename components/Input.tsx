import { Avatar } from '@mui/material';
import { useSession } from 'next-auth/react';
import React from 'react';
import { motion } from 'framer-motion';
import PhotoSizeSelectActualIcon from '@mui/icons-material/PhotoSizeSelectActual';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArticleIcon from '@mui/icons-material/Article';
import { useRecoilState } from 'recoil';
import { modalMediaContentState, modalState, modalTypeState } from '../recoil/modalAtom';
import { toastState } from '../recoil/toastAtom';

const Input: React.FC = () => {
  const { data: session } = useSession();
  //Using recoil to manage states. It's more simple than Redux.
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [mediaContentType, setMediaContentType] = useRecoilState(modalMediaContentState);
  const [toastShown, setToastShown] = useRecoilState(toastState);

  return (
    <div className="bg-white dark:bg-[#1d2226] rounded-lg p-3 space-y-3 border-gray-300 dark:border-none">
      <div className="flex items-center space-x-2">
        <Avatar
          // @ts-ignore
          src={session?.user?.image}
          className="!h-10 !w-10 cursor-pointer"
        />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400 py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left"
          onClick={() => {
            setModalOpen(true);
            setModalType('dropIn');
            setMediaContentType('photo');
          }}
        >
          New post
        </motion.button>
      </div>
      <div className="flex items-center flex-wrap gap-4 justify-center md:gap-x-10">
        <button
          className="input__button group"
          onClick={() => {
            setModalOpen(true);
            setModalType('dropIn');
            setMediaContentType('photo');
          }}
        >
          <PhotoSizeSelectActualIcon className="text-blue-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
        </button>
        <button
          className="input__button group"
          onClick={() => {
            setModalOpen(true);
            setModalType('dropIn');
            setMediaContentType('video');
          }}
        >
          <VideoCameraBackIcon className="text-green-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Video</h4>
        </button>
        <button className="input__button group" onClick={() => setToastShown(true)}>
          <BusinessCenterIcon className="text-blue-300" />
          <h4 className="opacity-80 group-hover:opacity-100">Job</h4>
        </button>
        <button className="input__button group" onClick={() => setToastShown(true)}>
          <ArticleIcon className="text-red-400" />
          <h4 className="opacity-80 group-hover:opacity-100 whitespace-nowrap">Write Article</h4>
        </button>
      </div>
    </div>
  );
};
export default Input;
