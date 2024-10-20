import clientPromise from "../../utils/lib/db";

export default async function handler(req, res) {
  try{
    const {productName='', productBoxPrice=0, productGramPrice=0, productkgPrice=0, productPackPrice=0} = req.body || {};
    const client = await clientPromise;
    const db = client.db('billing_app');

    const data = await db.collection('products').insertOne({
        name: productName,
        boxPrice: Number(productBoxPrice) || 0,
        gramPrice: Number(productGramPrice) || 0,
        kgPrice: Number(productkgPrice) || 0,
        packPrice: Number(productPackPrice) || 0,
        id: productName,
    });

    res.status(200).json({
      salesmen: data
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
