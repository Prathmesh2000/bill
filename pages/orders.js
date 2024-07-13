import React from "react";
import clientPromise from "../utils/lib/db";
import DataTable from "../src/component/OrderTable";
import NavBar from "../src/component/NavBar";

export default function orders ({data}) {
    const HeaderLabels = ["Person Type", "Salesman Name", "Customer Name", "Product Data", "Payment Mode", "Total Amount", "Received Amount", "Balance", "Date"];
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

    const data = await db.collection('orders').find({}).toArray();
    data.map((e) => delete e['_id']);
    return {
        props: {
            data: data || []
        }
    };
}