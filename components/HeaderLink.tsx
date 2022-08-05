import React from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';

type HeaderLinkProps = {
  icon: any;
  text: string;
  avatar?: boolean;
  feed?: boolean;
  active?: boolean;
  hidden?: boolean;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({ icon: Icon, text, feed, active, avatar, hidden }) => {
  const { data: session } = useSession();
  const { theme } = useTheme();
  return (
    <div
      className={`headeLink ${hidden && 'hidden md:inline-flex'}
      ${
        feed
          ? `headerLink_feed ${theme === 'dark' && 'text-white/75 hover:text-white'}`
          : `headerLink_unfeed ${theme === 'dark' && 'bg-white'}`
      }
      ${active && `!text-black ${theme === 'dark' && '!text-white'}`}`}
      onClick={() => avatar && signOut()}
    >
      {avatar ? <Icon className="!h-7 !w-7 lg:!-mb-1" src={session?.user?.image} /> : <Icon />}

      <h4 className={`text-sm ${feed && 'hidden lg:flex justify-center w-full mx-auto'}`}>{text}</h4>

      {active && <span className={`${theme === 'dark' && 'bg-white'} headerLink_active`} />}
    </div>
  );
};
export default HeaderLink;
