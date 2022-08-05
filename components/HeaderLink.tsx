import React from 'react';
import { useSession, signOut } from 'next-auth/react';

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
  return (
    <div
      className={`headeLink ${hidden && 'hidden md:inline-flex'}
      ${feed ? `headerLink_feed` : `headerLink_unfeed`}
      ${active && `!text-black dark:!text-white`}`}
      onClick={() => avatar && signOut()}
    >
      {avatar ? <Icon className="!h-7 !w-7 lg:!-mb-1" src={session?.user?.image} /> : <Icon />}

      <h4 className={`text-sm ${feed && 'hidden lg:flex justify-center w-full mx-auto'}`}>{text}</h4>

      {active && <span className="headerLink_active" />}
    </div>
  );
};
export default HeaderLink;
