import clientPromise from "../../utils/lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const {
      _id, 
      productName = '', 
      productBoxPrice = 0, 
      productGramPrice = 0, 
      productkgPrice = 0, 
      productPackPrice = 0
    } = req.body || {};

    const client = await clientPromise;
    const db = client.db('billing_app');

    if (!_id) {
      return res.status(400).json({ error: 'Product _id is required' });
    }

    const filter = { _id: new ObjectId(_id) };
    const update = {
      $set: {
        name: productName,
        boxPrice: Number(productBoxPrice) || 0,
        gramPrice: Number(productGramPrice) || 0,
        kgPrice: Number(productkgPrice) || 0,
        packPrice: Number(productPackPrice) || 0,
      },
    };

    const result = await db.collection('products').updateOne(filter, update);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Product not found or data is the same' });
    }

    res.status(200).json({ message: 'Product updated successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
