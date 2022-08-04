import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
  // Take it from doc
  adapter: MongoDBAdapter(clientPromise),
  // Doc 'secret'
  secret: process.env.JWT_SECRET,
  // Choosing default signin page
  pages: { signIn: '/home' },
  // The way it's stores user session and max age of session.
  session: { strategy: 'jwt' },
  maxAge: 30 * 24 * 60 * 60,
  //Allows to see error logs
  debug: true,
  // I use only google profiles for auth
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
});
