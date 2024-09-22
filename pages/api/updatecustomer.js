import clientPromise from "../../utils/lib/db";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  try {
    const { _id, name, number, balance, email } = req.body || {};
    const client = await clientPromise;
    const db = client.db('billing_app');

    if (!_id) {
      // If no _id is provided, create a new customer
      const data = await db.collection('customer').insertOne({
        name: name,
        number: number,
        balance: balance,
        email: email
      });

      return res.status(200).json({
        message: 'Customer created successfully',
        customer: data.ops[0]
      });
    } else {
      // If _id is provided, update the existing customer
      const filter = { _id: new ObjectId(_id) };
      const update = {
        $set: {
          name: name,
          number: number,
          balance: balance,
          email: email
        }
      };

      const result = await db.collection('customer').updateOne(filter, update);

      if (result.modifiedCount === 0) {
        return res.status(404).json({ error: 'Customer not found or data is the same' });
      }

      return res.status(200).json({ message: 'Customer updated successfully' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Something went wrong' });
  }
}
