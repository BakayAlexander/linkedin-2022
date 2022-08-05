import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';

export const getServerSideProps: GetServerSideProps = async context => {
  //Check if the user authenticated on the server
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
    };
  }
  return {
    props: {
      session,
    },
  };
};

const Home: NextPage = () => {
  return (
    <div className="bg-[#f3f2ef] h-screen overflow-y-scroll dark:bg-black/90 dark:text-white md:space-y-6">
      <Head>
        <title>LinkedIn - Feed</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className="flex justify-center gap-x-5 px-4 sm:px-12">
        <div className="flex flex-col md:flex-row gap-5">
          <Sidebar />
          {/* Feed */}
        </div>
        {/* Widgets */}
      </main>
    </div>
  );
};

export default Home;
