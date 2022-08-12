import { ObjectId } from 'mongodb';
import { connectToDatabase } from '../../../utils/connectToDb';

export default async function handler(req, res) {
  //To get post id I looking for a query, so the id param from deletePost will be right there
  const {
    method,
    query: { id },
  } = req;

  const { db } = await connectToDatabase();

  if (method === 'DELETE') {
    try {
      await db.collection('posts').deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: 'The post has been deleted successfully' });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  if (method === 'PATCH') {
    try {
      // const findedPost = await db.collection('posts').findOne({ _id: new ObjectId(id) });
      if (findedPost.likes.indexOf(id) === -1) {
        // console.log('like!');
        // const post = await db
        //   .collection('posts')
        //   .updateOne({ _id: new ObjectId(id) }, { $set: { likes: [id] } });
        // res.status(201).json(post);
      } else {
        // console.log('delete like');
        // const post = await db
        //   .collection('posts')
        //   .updateOne(
        //     { _id: new ObjectId(id) },
        //     { $set: { likes: [...likes, 'ssssasssssssadasd'] } }
        //   );
        // res.status(201).json(post);
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
