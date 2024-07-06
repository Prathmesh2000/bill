import clientPromise from "../../utils/lib/db";

export default async function handler(req, res) {

try{
  const client = await clientPromise;
  const db = client.db('billing_app');

  const data = await db.collection('products').find({}).toArray();
  res.status(200).json({
    products: data
  });
} catch(e){}
  const products = [
    { id: 1, name: 'Product A' },
    { id: 2, name: 'Product B' }
  ];
  res.status(200).json({products: products});
}
