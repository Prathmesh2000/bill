import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.scss';
import NavBar from '../src/component/NavBar';

const Home = () => {
  const [personType, setPersonType] = useState('');
  const [salesmen, setSalesmen] = useState([]);
  const [customer, setCustomer] = useState([]);
  const [selectedSalesman, setSelectedSalesman] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [products, setProducts] = useState([]);
  const [productData, setProductData] = useState([{ id: 1, name: '', unit: '', qty: '', price: '' }]);
  const [paymentMode, setPaymentMode] = useState('');
  const [receivedAmount, setReceivedAmount] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [balance, setBalance] = useState(0);
  const [ogBalance, setOgBalance] = useState(0)

  useEffect(() => {
    fetch('/api/salesmen')
      .then(res => res.json())
      .then(data => setSalesmen(data?.salesmen));

    fetch('/api/customer')
      .then(res => res.json())
      .then(data => setCustomer(data?.customer));

    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data?.products));
  }, []);

  useEffect(() => {
    let total = 0;
    productData.forEach(product => {
      total += (product.qty * product.price);
    });
    setTotalAmount(total);
    setBalance(receivedAmount - total + Number(ogBalance));
  }, [productData, receivedAmount]);

  const handleProductChange = (index, field, value) => {
    const newProductData = [...productData];
    newProductData[index][field] = value;
    setProductData(newProductData);
  };

  const addProduct = () => {
    setProductData([...productData, { id: productData.length + 1, name: '', unit: '', qty: '', price: '' }]);
  };

  const removeProduct = (index) => {
    const newProductData = productData.filter((_, i) => i !== index);
    setProductData(newProductData);
  };

  const handleSubmit = () => {
    const transaction = {
      personType,
      selectedSalesman,
      customerName,
      productData,
      paymentMode,
      receivedAmount,
      totalAmount,
      balance
    };
    fetch('/api/save-transaction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(transaction)
    })
      .then(res => res.json())
      .then(data => alert(data.message));
  };

  return (
    <>
      <NavBar />
      <div className={`container ${styles.wrapper}`}>
        <h1>Transaction Form</h1>
        <div className={styles.formGroup}>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" value="salesman" checked={personType === 'salesman'} onChange={() => setPersonType('salesman')} />
              Salesman
            </label>
            <label>
              <input type="radio" value="customer" checked={personType === 'customer'} onChange={() => setPersonType('customer')} />
              Customer
            </label>
          </div>

          {personType === 'salesman' && (
            <div>
              <label>Select Salesman:</label>
              <select value={selectedSalesman} onChange={(e) => {
                  let value  = e.target.value || null;
                  if(value) {
                    let currBalance = salesmen.filter(e=>e.name == value);
                    if(currBalance.length) currBalance = currBalance[0]?.balance || 0;
                    setBalance(currBalance);
                    setOgBalance(currBalance)
                    setSelectedSalesman(value)
                  }
                }}>
                <option value="">Select</option>
                {salesmen.map(salesman => (
                  <option key={salesman.id} value={salesman.name}>{salesman.name}</option>
                ))}
              </select>
            </div>
          )}

          {personType === 'customer' && (
            <div>
              <label>Select Customer:</label>
              <select value={customerName} onChange={(e) => {
                  let value  = e.target.value || null;
                  if(value) {
                    let currBalance = customer.filter(e=>e.name == value);
                    if(currBalance.length) currBalance = currBalance[0]?.balance || 0;
                    setBalance(currBalance);
                    setOgBalance(currBalance)
                    setCustomerName(value)
                  }
                }}>
                <option value="">Select</option>
                {customer.map(salesman => (
                  <option key={salesman.id} value={salesman.name}>{salesman.name}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <h2>Products</h2>
        {productData.map((product, index) => (
          <div className={`${styles.formGroup} ${styles.productGroup}`} key={product.id}>
            <div>
              <label>Product</label>
              <select value={product.name} onChange={(e) => handleProductChange(index, 'name', e.target.value)}>
                <option value="">Select Product</option>
                {products.map(p => (
                  <option key={p.id} value={p.name}>{p.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Unit</label>
              <select value={product.unit} onChange={(e) => handleProductChange(index, 'unit', e.target.value)}>
                <option value="">Select Unit</option>
                <option value="box">Box</option>
                <option value="grams">Grams</option>
                <option value="kgs">Kgs</option>
                <option value="packs">Packs</option>
              </select>
            </div>
            <div>
              <label>Quantity</label>
              <input type="number" placeholder="Quantity" value={product.qty} onChange={(e) => handleProductChange(index, 'qty', e.target.value)} />
            </div>
            <div>
              <label>Price</label>
              <input type="number" placeholder="Price" value={product.price} onChange={(e) => handleProductChange(index, 'price', e.target.value)} />
            </div>
            {index > 0 && <button className={styles.buttonClass} onClick={() => removeProduct(index)}>Remove</button>}
          </div>
        ))}
        <button className={styles.buttonClass} onClick={addProduct}>Add Product</button>

        <h2>Payment</h2>
        <div className={styles.formGroup}>
          <div className={styles.radioGroup}>
            <label>
              <input type="radio" value="online" checked={paymentMode === 'online'} onChange={() => setPaymentMode('online')} />
              Online
            </label>
            <label>
              <input type="radio" value="cash" checked={paymentMode === 'cash'} onChange={() => setPaymentMode('cash')} />
              Cash
            </label>
          </div>

          <div>
            <label>Received Amount:</label>
            <input type="number" value={receivedAmount} onChange={(e) => setReceivedAmount(e.target.value)} />
          </div>

          <div>
            <label>Total Amount: {totalAmount}</label>
          </div>

          <div>
            <label>Balance: </label>
            <span className={`${styles.balance} ${balance < 0 ? styles.negative : ''}`}>
              {balance < 0 ? `-${Math.abs(balance)}` : `+${balance}`}
            </span>
          </div>
        </div>

        <button className={styles.buttonClass} onClick={handleSubmit}>Submit</button>
      </div>
    </>
  );
};

export default Home;