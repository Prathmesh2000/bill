import React, { useCallback, useEffect, useState } from "react";
import clientPromise from "../utils/lib/db";
import styles from "../styles/AddSalesmen.module.scss";
import NavBar from "../src/component/NavBar";

export default function AddSalesmen(props) {
    const { data = [] } = props;
    const [search, setSearch] = useState('');
    const [productList, setProductList] = useState(data);
    const [productName, setProductName] = useState('');
    const [productBoxPrice, setProductBoxPrice] = useState('');
    const [productGramsPrice, setProductGramsPrice] = useState('');
    const [productkgsPrice, setProductkgsPrice] = useState('');
    const [productPacksPrice, setProductPacksPrice] = useState('');
    const [editProductName, setEditProductName] = useState('');
    const [editProductBoxPrice, setEditProductBoxPrice] = useState('');
    const [editProductkgsPrice, setEditProductkgsPrice] = useState('');
    const [editProductGramsPrice, setEditProductGramsPrice] = useState('');
    const [editProductPacksPrice, setEditProductPacksPrice] = useState('');
    const [editIndex, setEditIndex] = useState(-1);

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
        if(!productName?.length ) {
            alert('Kindly fill poduct name');
            return;
        }
        fetch('/api/addproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                productName: productName,
                productBoxPrice: productBoxPrice,
                productGramPrice: productGramsPrice,
                productkgPrice: productkgsPrice,
                productPackPrice: productPacksPrice
            })
        })
            .then(res => res.json())
            .then(data => alert('sucessfully added'));
    };

    const handleEditClick = (index) => {
        setEditIndex(index);
        const dataArr = data[index];
        let { name = '', boxPrice = 0, gramPrice = 0, kgPrice = 0, packPrice = 0 } = dataArr;
        setEditProductName(name);
        setEditProductBoxPrice(boxPrice);
        setEditProductGramsPrice(gramPrice);
        setEditProductkgsPrice(kgPrice)
        setEditProductPacksPrice(packPrice)
    }

    const handleUpdateClick = (id, index) => {
        fetch('/api/updateproducts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: JSON.parse(id),
                productName: editProductName,
                productBoxPrice: editProductBoxPrice,
                productGramPrice: editProductGramsPrice,
                productkgPrice: editProductkgsPrice,
                productPackPrice: editProductPacksPrice
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(data?.message || data.error)
            });
        setEditIndex(-1);
        setEditProductName('');
        setEditProductBoxPrice('');
        setEditProductGramsPrice('');
        setEditProductkgsPrice('')
        setEditProductPacksPrice('')
    }

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <h3>Add New Product</h3>
                <div className={styles['add-salesmen-form']}>
                    <div>
                        <label htmlFor="name">Enter Product Name:</label>
                        <input value={productName} onChange={(e) => setProductName(e.target.value)} type="text" id="product-name" name="product-name" required />
                    </div>
                    <div>
                        <label htmlFor="name">Enter Product Box Price:</label>
                        <input value={productBoxPrice} onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9.]/g, "");
                            if (/^\d*\.?\d*$/.test(value)) {
                                setProductBoxPrice(value);
                            }
                        }}
                        min="0" pattern="^\d*\.?\d*$" type="text" id="product-box-price" name="product-box-price" inputMode="numeric" required />
                    </div>
                    <div>
                        <label htmlFor="name">Enter Product Gram Price:</label>
                        <input value={productGramsPrice} onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9.]/g, "");
                            if (/^\d*\.?\d*$/.test(value)) {
                                setProductGramsPrice(value);
                            }
                        }}
                        min="0" pattern="^\d*\.?\d*$" type="text" id="product-grams-price" name="product-grams-price" inputMode="numeric" required />
                    </div>
                    <div>
                        <label htmlFor="name">Enter Product kg Price:</label>
                        <input value={productkgsPrice} onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9.]/g, "");
                            if (/^\d*\.?\d*$/.test(value)) {
                                setProductkgsPrice(value);
                            }
                        }}
                        min="0" pattern="^\d*\.?\d*$" type="text" id="product-kgs-price" name="product-kgs-price" inputMode="numeric" required />
                    </div>
                    <div>
                        <label htmlFor="name">Enter Product Pack Price:</label>
                        <input value={productPacksPrice} onChange={(e) => {
                            let value = e.target.value;
                            value = value.replace(/[^0-9.]/g, "");
                            if (/^\d*\.?\d*$/.test(value)) {
                                setProductPacksPrice(value);
                            }
                        }}
                        min="0" pattern="^\d*\.?\d*$" type="text" id="product-pack-price" name="product-pack-price" inputMode="numeric" required />
                    </div>
                    <button onClick={handleAddProduct}>Add Product</button>
                </div>

                <h3>Product List</h3>
                <div className={styles['search-bar']}>
                    <input value={search} onChange={handleSearch} placeholder="Search Products..." />
                </div>
                <div className={styles['salesmen-list']}>
                    {
                        productList.map((val, i) => {
                            let { _id, name = '', boxPrice = 0, gramPrice = 0, kgPrice = 0, packPrice = 0 } = val;
                            return (
                                <div className={styles['salesmen-item']} id={`salesmen_${i}`} key={`salesmen_${i}`}>
                                    <div>
                                        <div>
                                            <span>Product Name: </span>
                                            {
                                                editIndex === i ? 
                                                <input value={editProductName} onChange={(e) => setEditProductName(e.target.value)} type="text" id="edit-product-name" name="edit-product-name" required />
                                                :<span>{name}</span>
                                            }
                                        </div>
                                        <div>
                                            <span>Product Box Price: </span>
                                            {
                                                editIndex === i ? 
                                                <input value={editProductBoxPrice} onChange={(e) => {
                                                    let value = e.target.value;
                                                    value = value.replace(/[^0-9.]/g, "");
                                                    if (/^\d*\.?\d*$/.test(value)) {
                                                        setEditProductBoxPrice(value);
                                                    }
                                                }}
                                                min="0" pattern="^\d*\.?\d*$" type="text" id="edit-product-box-price" name="edit-product-box-price" inputMode="numeric" required />
                                                :<span>{boxPrice}</span>
                                            }
                                        </div>
                                        <div>
                                            <span>Product Gram Price: </span>
                                            {
                                                editIndex === i ? 
                                                <input value={editProductGramsPrice} onChange={(e) => {
                                                    let value = e.target.value;
                                                    value = value.replace(/[^0-9.]/g, "");
                                                    if (/^\d*\.?\d*$/.test(value)) {
                                                        setEditProductGramsPrice(value);
                                                    }
                                                }}
                                                min="0" pattern="^\d*\.?\d*$" type="text" id="edit-product-grams-price" name="edit-product-grams-price" inputMode="numeric" required />
                                                :<span>{gramPrice}</span>
                                            }
                                        </div>
                                        <div>
                                            <span>Product kg Price: </span>
                                            {
                                                editIndex === i ? 
                                                <input value={editProductkgsPrice} onChange={(e) => {
                                                    let value = e.target.value;
                                                    value = value.replace(/[^0-9.]/g, "");
                                                    if (/^\d*\.?\d*$/.test(value)) {
                                                        setEditProductkgsPrice(value);
                                                    }
                                                }}
                                                min="0" pattern="^\d*\.?\d*$" type="text" id="edit-product-kgs-price" name="edit-product-kgs-price" inputMode="numeric" required />
                                                :<span>{kgPrice}</span>
                                            }
                                        </div>
                                        <div>
                                            <span>Product Pack Price: </span>
                                            {
                                                editIndex === i ? 
                                                <input value={editProductPacksPrice} onChange={(e) => {
                                                    let value = e.target.value;
                                                    value = value.replace(/[^0-9.]/g, "");
                                                    if (/^\d*\.?\d*$/.test(value)) {
                                                        setEditProductPacksPrice(value);
                                                    }
                                                }}
                                                min="0" pattern="^\d*\.?\d*$" type="text" id="edit-product-pack-price" name="edit-product-pack-price" inputMode="numeric" required />
                                                :<span>{packPrice}</span>
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            editIndex === i ? 
                                            <button className={styles['edit-button']} onClick={()=>handleUpdateClick(_id, i)}>Update</button>
                                            :
                                            <button className={styles['edit-button']} onClick={()=>handleEditClick(i)}>Edit</button>
                                        }
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
    const updatedData = data.map((e) => {
        const { _id, ...rest } = e;
        return { _id: JSON.stringify(_id), ...rest };
    });      
    return {
        props: {
            data: updatedData || []
        }
    };
}
