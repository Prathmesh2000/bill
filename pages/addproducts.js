import React, { useCallback, useEffect, useState } from "react";
import clientPromise from "../utils/lib/db";
import styles from "../styles/AddSalesmen.module.scss";
import NavBar from "../src/component/NavBar";

export default function AddSalesmen(props) {
    const { data = [] } = props;
    const [search, setSearch] = useState('');
    const [productList, setProductList] = useState(data);
    const [productName, setProductName] = useState('');

    useEffect(() => {
        if (search) {
            let productListTemp = data.filter(e => e?.name?.includes(search));
            setProductList([...productListTemp]);
        } else {
            setProductList(data);
        }
    }, [search]);

    const handleSearch = (e) => {
        let value = e.target.value;
        setSearch(value);
    };

    const handleAddProduct = async () => {
        fetch('/api/addproducts', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName: productName,
            })
          })
            .then(res => res.json())
            .then(data => alert('sucessfully added'));
    };

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <h3>Add New Product</h3>
                <div className={styles['add-salesmen-form']}>
                    <div>
                        <label htmlFor="name">Enter Product Name:</label>
                        <input value={productName} onChange={(e)=>setProductName(e.target.value)} type="text" id="name" name="name" required />
                    </div>
                    <button onClick={handleAddProduct}>Add Product</button>
                </div>

                <h3>Product List</h3>
                <div className={styles['search-bar']}>
                    <input value={search} onChange={handleSearch} placeholder="Search salesmen..." />
                </div>
                <div className={styles['salesmen-list']}>
                    {
                        productList.map((val, i) => {
                            let { name = ''  } = val;
                            return (
                                <div className={styles['salesmen-item']} id={`salesmen_${i}`} key={`salesmen_${i}`}>
                                    <div>
                                        <span>Product Name: </span>
                                        <span>{name}</span>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps() {
    const client = await clientPromise;
    const db = client.db('billing_app');

    const data = await db.collection('products').find({}).toArray();
    data.map((e) => delete e['_id']);
    return {
        props: {
            data: data || []
        }
    };
}
