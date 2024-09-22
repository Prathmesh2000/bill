import React from "react";
import clientPromise from "../utils/lib/db";
import DataTable from "../src/component/OrderTable";
import NavBar from "../src/component/NavBar";

export default function orders ({data}) {
    console.log(data, 'datadata')
    const HeaderLabels = ["Person Type", "Salesman Name", "Customer Name", "Product Data", "Total Amount", "Online Received Amount", "Cash Received Amount", "Balance", "Date", "Action"];
    return (
        <>
            <NavBar />
            <DataTable data={data} HeaderLabels={HeaderLabels}/>
        </>
    )
}

export async function getServerSideProps() {
    const client = await clientPromise;
    const db = client.db('billing_app');

    const data = await db.collection('orders').find({}).sort({ date: -1 }).toArray();

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