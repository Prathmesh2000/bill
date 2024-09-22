import clientPromise from "../../utils/lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const { _id, name, number, balance, email } = req.body || {};
    const client = await clientPromise;
    const db = client.db('billing_app');

    if (!_id) {
      return res.status(400).json({ error: 'Salesman _id is required' });
    }

    const filter = { _id: new ObjectId(_id) };
    const update = {
      $set: {
        name: name,
        number: number,
        balance: balance,
        email: email,
      },
    };

    const result = await db.collection('salesman').updateOne(filter, update);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: 'Salesman not found or data is the same' });
    }

    res.status(200).json({ message: 'Salesman updated successfully' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
}