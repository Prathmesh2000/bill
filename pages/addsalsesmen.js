import React, { useCallback, useEffect, useState } from "react";
import clientPromise from "../utils/lib/db";
import styles from "../styles/AddSalesmen.module.scss";

export default function AddSalesmen(props) {
    const { data = [] } = props;
    const [search, setSearch] = useState('');
    const [salesmenList, setSalesmenList] = useState(data);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [balance, setBalance] = useState('');

    useEffect(() => {
        if (search) {
            let salesmenListTemp = data.filter(e => e?.name?.includes(search));
            setSalesmenList([...salesmenListTemp]);
        } else {
            setSalesmenList(data);
        }
    }, [search]);

    const handleSearch = (e) => {
        let value = e.target.value;
        setSearch(value);
    };

    const handleAddSalesmen = async () => {
        fetch('/api/addsalesmen', {
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

    return (
        <div className={styles.container}>
            <h3>Add New Salesmen</h3>
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
                <button onClick={handleAddSalesmen}>Add Salesman</button>
            </div>

            <h3>Salesmen List</h3>
            <div className={styles['search-bar']}>
                <input value={search} onChange={handleSearch} placeholder="Search salesmen..." />
            </div>
            <div className={styles['salesmen-list']}>
                {
                    salesmenList.map((val, i) => {
                        let { name = '', email = '', number = '', balance = 0 } = val;
                        return (
                            <div className={styles['salesmen-item']} id={`salesmen_${i}`} key={`salesmen_${i}`}>
                                <div>
                                    <span>Name: </span>
                                    <span>{name}</span>
                                </div>
                                <div>
                                    <span>Email: </span>
                                    <span>{email}</span>
                                </div>
                                <div>
                                    <span>Mobile: </span>
                                    <span>{number}</span>
                                </div>
                                <div>
                                    <span>Balance: </span>
                                    <span>{balance}</span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    );
}

export async function getServerSideProps() {
    const client = await clientPromise;
    const db = client.db('billing_app');

    const data = await db.collection('salesman').find({}).toArray();
    data.map((e) => delete e['_id']);
    return {
        props: {
            data: data || []
        }
    };
}
