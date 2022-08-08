import { Timestamp } from 'mongodb';
import { connectToDatabase } from '../../../utils/connectToDb';

export default async function handler(req, res) {
  const { method, body } = req;
  const { db } = connectToDatabase();

  if (method === 'GET') {
    try {
      // timestamp: -1 allows me to sort from newest to latest posts
      const posts = await db.collection('posts').find().sort({ timestamp: -1 }).toArray();
      res.status(200).json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  if (method === 'POST') {
    try {
      const post = await db.collection('posts').insertOne({ ...body, timestamp: new Timestamp() });
      res.status(201).json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}
