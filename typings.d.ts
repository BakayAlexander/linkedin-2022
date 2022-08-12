export type Post = {
  _id: string;
  text: string;
  photoUrl: string;
  userName: string;
  email: string;
  userImg: string;
  createdAt: string;
};

export type News = {
  source: {
    id: string | null;
    name: string;
  };
  author: string;
  title: string;
  description: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  url: string;
};
