import React, { useCallback, useEffect, useState } from "react";
import clientPromise from "../utils/lib/db";
import styles from "../styles/AddSalesmen.module.scss";
import NavBar from "../src/component/NavBar";

export default function AddSalesmen(props) {
    const { data = [] } = props;
    const [search, setSearch] = useState('');
    const [customerList, setCustomerList] = useState(data);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [balance, setBalance] = useState('');
    const [editIndex, setEditIndex] = useState(-1);
    const [editName, setEditName] = useState('');
    const [editEmail, setEditEmail] = useState('');
    const [editNumber, setEditNumber] = useState('');
    const [editBalance, setEditBalance] = useState('');

    useEffect(() => {
        if (search) {
            let customerListTemp = data.filter(e => e?.name?.includes(search));
            setCustomerList([...customerListTemp]);
        } else {
            setCustomerList(data);
        }
    }, [search]);

    const handleSearch = (e) => {
        let value = e.target.value;
        setSearch(value);
    };

    const handleAddCustomer = async () => {
        fetch('/api/addcustomer', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                number: number,
                balance: balance
            })
          })
            .then(res => res.json())
            .then(data => alert('sucessfully added'));
    };

    const handleUpdateClick =  (id, index) => {
        fetch('/api/updatecustomer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: JSON.parse(id),
                name: editName, 
                number: editNumber, 
                balance: editBalance, 
                email: editEmail
            })
        })
            .then(res => res.json())
            .then(data => {
                alert(data?.message || data.error)
            });
        setEditIndex(-1);
        setEditName('');
        setEditEmail('');
        setEditNumber('');
        setEditBalance('');
    }
    const handleEditClick = (index) => {
        setEditIndex(index);
        const dataObj = data[index];
        let { name = '', email = '', number = '', balance = 0 } = dataObj;
        setEditName(name);
        setEditEmail(email);
        setEditNumber(number);
        setEditBalance(balance);

    }

    return (
        <>
            <NavBar />
            <div className={styles.container}>
                <h3>Add New Customer</h3>
                <div className={styles['add-salesmen-form']}>
                    <div>
                        <label htmlFor="name">Enter Name:</label>
                        <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" name="name" required />
                    </div>
                    <div>
                        <label htmlFor="mobile">Enter Mobile:</label>
                        <input value={number} onChange={(e)=>setNumber(e.target.value)} type="tel" id="mobile" name="mobile" required />
                    </div>
                    <div>
                        <label htmlFor="email">Enter Email:</label>
                        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" name="email" required />
                    </div>
                    <div>
                        <label htmlFor="balance">Enter Balance:</label>
                        <input value={balance} onChange={(e)=>setBalance(e.target.value)} type="number" id="balance" name="balance" required />
                    </div>
                    <button onClick={handleAddCustomer}>Add Customer</button>
                </div>

                <h3>Customer List</h3>
                <div className={styles['search-bar']}>
                    <input value={search} onChange={handleSearch} placeholder="Search Customer..." />
                </div>
                <div className={styles['salesmen-list']}>
                    {
                        customerList.map((val, i) => {
                            let { _id, name = '', email = '', number = '', balance = 0 } = val;
                            return (
                                <div className={styles['salesmen-item']} id={`salesmen_${i}`} key={`salesmen_${i}`}>
                                    <div>
                                        <div>
                                            <span>Name: </span>
                                            {
                                                editIndex==i ?
                                                <input value={editName} onChange={(e)=>setEditName(e.target.value)} type="text" id="edit-name" name="edit-name" required />
                                                :<span>{name}</span>
                                            }
                                        </div>
                                        <div>
                                            <span>Email: </span>
                                            {
                                                editIndex==i ?
                                                <input value={editEmail} onChange={(e)=>setEditEmail(e.target.value)} type="email" id="edit-email" name="edit-email" required />
                                                :<span>{email}</span>
                                            }
                                        </div>
                                        <div>
                                            <span>Mobile: </span>
                                            {
                                                editIndex==i ?
                                                <input value={editNumber} onChange={(e)=>setEditNumber(e.target.value)} type="tel" id="edit-mobile" name="edit-mobile" required />
                                                :<span>{number}</span>
                                            }
                                        </div>
                                        <div>
                                            <span>Balance: </span>
                                            {
                                                editIndex==i ?
                                                <input value={editBalance} onChange={(e)=>setEditBalance(e.target.value)} type="number" id="edit-balance" name="edit-balance" required />
                                                :<span>{balance}</span>
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

    const data = await db.collection('customer').find({}).toArray();
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
