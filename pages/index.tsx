import { AnimatePresence } from 'framer-motion';
import type { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useRecoilState } from 'recoil';
import Feed from '../components/Feed';
import Header from '../components/Header';
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import { modalState, modalTypeState } from '../recoil/modalAtom';
import { connectToDatabase } from '../utils/connectToDb';
import { Post, News } from '../typings';
import Widgets from '../components/Widgets';

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

  //Get posts to SSR.
  const { db } = await connectToDatabase();
  const posts = await db.collection('posts').find().sort({ timestamp: -1 }).toArray();

  //Get news to SSR.
  const news = await fetch(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.NEWS_API_KEY}`
  ).then(res => res.json());

  return {
    props: {
      session,
      news: news.articles,
      //Because posts are not at JSON format, and I need this strange operation to make SSR work.
      posts: posts.map((post: Post) => ({
        _id: post._id.toString(),
        text: post.text,
        photoUrl: post.photoUrl,
        userName: post.userName,
        email: post.email,
        userImg: post.userImg,
        createdAt: post.createdAt,
      })),
    },
  };
};

export type PostsProps = {
  posts: Post[];
  news: News[];
};

const Home = ({ posts, news }: PostsProps) => {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

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
          <Feed posts={posts} />
        </div>

        <Widgets news={news} />

        {/* Wrap in AnimatePresence to be able to use framer motion */}
        <AnimatePresence>
          {modalOpen && <Modal handleClose={() => setModalOpen(false)} type={modalType} />}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Home;
