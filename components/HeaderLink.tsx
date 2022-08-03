import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import React from 'react';

type HeaderLinkProps = {
  icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & { muiName: string };
  text: string;
  avatar: string;
  feed?: boolean;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({ icon: Icon, text, avatar, feed }) => {
  return (
    <div
      className={`${
        feed
          ? 'text-black/70 space-y-1 hover:text-black dark:text-white/75 dark:hover:text-white lg:-mb-1.5'
          : 'text-gray-500 hover:text-gray-700'
      } flex flex-col justify-center items-center cursor-pointer`}
    >
      {avatar ? <Icon className="!h-7 !w-7" /> : <Icon className="!h-7 !w-7" />}
      <h4 className="text-sm">{text}</h4>
    </div>
  );
};
export default HeaderLink;
