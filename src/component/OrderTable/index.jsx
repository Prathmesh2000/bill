import React, { useState } from 'react';
import styles from './DataTable.module.scss';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


const DataTable = ({ data, HeaderLabels }) => {
    const [search, setSearch] = useState('');
    const [sortConfig, setSortConfig] = useState(null);
    const [editIndex, setEditIndex] = useState(-1);

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const sortedData = [...data].sort((a, b) => {
        if (sortConfig !== null) {
            const { key, direction } = sortConfig;
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        }
        return 0;
    });

    const filteredData = sortedData.filter(item => {
        return Object.keys(item).some(key =>
            String(item[key]).toLowerCase().includes(search.toLowerCase())
        );
    });

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const downloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
        XLSX.writeFile(wb, 'data.xlsx');
    };

    // const handleUpdateClick = (id, index) => {

    // }

    // const handleEditClick = (index) => {
    //     setEditIndex(index);
    // }

    return (
        <div className={styles.container}>
            <div className={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={handleSearch}
                    className={styles.searchInput}
                />
                <button onClick={downloadExcel} className={styles.downloadButton}>Download XLS</button>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {HeaderLabels.map((key) => (
                            <th key={key} onClick={() => requestSort(key)}>
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((item, index) => (
                        <tr key={index}>
                            <td key={`personType_${index}`}>{typeof item?.personType === 'object' ? JSON.stringify(item?.personType) : item?.personType || ''}</td>
                            <td key={`selectedSalesman_${index}`}>{typeof item?.selectedSalesman === 'object' ? JSON.stringify(item?.selectedSalesman) : item?.selectedSalesman || ''}</td>
                            <td key={`customerName_${index}`}>{typeof item?.customerName === 'object' ? JSON.stringify(item?.customerName) : item?.customerName || ''}</td>
                            <td key={`productData_${index}`}>{typeof item?.productData === 'object' ? JSON.stringify(item?.productData) : item?.productData || ''}</td>
                            <td key={`totalAmount_${index}`}>{typeof item?.totalAmount === 'object' ? JSON.stringify(item?.totalAmount) : item?.totalAmount || ''}</td>
                            <td key={`onlineReceivedAmount_${index}`}>{typeof item?.onlineReceivedAmount === 'object' ? JSON.stringify(item?.onlineReceivedAmount) : item?.onlineReceivedAmount || ''}</td>
                            <td key={`cashReceivedAmount_${index}`}>{typeof item?.cashReceivedAmount === 'object' ? JSON.stringify(item?.cashReceivedAmount) : item?.cashReceivedAmount || ''}</td>
                            <td key={`balance_${index}`}>{typeof item?.balance === 'object' ? JSON.stringify(item?.balance) : item?.balance || ''}</td>
                            <td key={`date_${index}`}>{typeof item?.date === 'object' ? JSON.stringify(item?.date) : item?.date || ''}</td>
                            {/* <td key={`button_${index}`}>
                                {
                                editIndex === index ? 
                                    <button className={styles['edit-button']} onClick={()=>handleUpdateClick(_id, index)}>Update</button>
                                    :
                                    <button className={styles['edit-button']} onClick={()=>handleEditClick(index)}>Edit</button>
                                }
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DataTable;
