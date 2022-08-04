import Image from 'next/image';
import Head from 'next/head';
import React, { useEffect } from 'react';
import HeaderLink from '../components/HeaderLink';
import ExploreIcon from '@mui/icons-material/Explore';
import GroupIcon from '@mui/icons-material/Group';
import OndemandVideoSharpIcon from '@mui/icons-material/OndemandVideoSharp';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { getProviders, signIn } from 'next-auth/react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

const Home = ({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();

  return (
    <div className="space-y-10 relative">
      <Head>
        <title>LinkedIn - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className="flex justify-around items-center py-4">
        <Image src="https://rb.gy/vtbzlp" alt="LinkedIn logo" width={144} height={40} />
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink icon={ExploreIcon} text="Discover" />
            <HeaderLink icon={GroupIcon} text="People" />
            <HeaderLink icon={OndemandVideoSharpIcon} text="Learning" />
            <HeaderLink icon={BusinessCenterIcon} text="Jobs" />
          </div>
          {Object.values(providers!).map(provider => (
            <div key={provider.name}>
              <div className="pl-4">
                <button
                  className="text-blue-700 font-semibold rounded-full border border-blue-700 px-5 py-1.5 transition-all hover:border-2"
                  onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                >
                  Sign in
                </button>
              </div>
            </div>
          ))}
        </div>
      </header>
      <main className="flex flex-col items-center xl:flex-row max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug pl-4 xl:pl-0">
            Welcome to your professional community
          </h1>
          <div className="space-y-4">
            <div className="home__intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="home__intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="home__intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>
          <div className="relative w-80 h-80 xl:absolute xl:w-[650px] xl:h-[650px] xl:top-14 xl:right-5">
            <Image src="https://rb.gy/vkzpzt" alt="Layout image of man" layout="fill" priority />
          </div>
        </div>
      </main>
    </div>
  );
};
export default Home;
