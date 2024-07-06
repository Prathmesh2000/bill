import clientPromise from "../../utils/lib/db";

export default async function handler(req, res) {
  const transaction = req.body;

  let currDate = new Date();
  currDate = currDate.toLocaleString('en-IN')
  if (req.method === 'POST') {
    try{
      const client = await clientPromise;
      const db = client.db('billing_app');

      await db.collection('orders').insertOne(transaction)
      await db.collection('salesman').updateOne(
        { name: selectedSalesman },
        { $set: {
            balance: 89
          } 
        }
      );
  
    } catch(err){

    }
    res.status(200).json({ message: 'Transaction saved successfully!', transaction: transaction, currDate: currDate });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
