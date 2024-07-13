import clientPromise from "../../utils/lib/db";

export default async function handler(req, res) {
  try{
    const client = await clientPromise;
    const db = client.db('billing_app');

    const data = await db.collection('customer').find({}).toArray();

    res.status(200).json({
      customer: data
    });
  } catch(e){
    const salesmen = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Smith' }
    ];

    res.status(200).json({
      salesmen: salesmen
    });
  }
}