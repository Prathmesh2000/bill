import React from "react";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={styles['nav-container']}>
      <ul className={styles['nav-list']}>
        <li className={styles['nav-item']}><a href={'/'}>Main</a></li>
        <li className={styles['nav-item']}><a href={'/orders'}>Orders</a></li>
        <li className={styles['nav-item']}><a href={'/addsalsesmen'}>Add Salesman</a></li>
        <li className={styles['nav-item']}><a href={'/addcustomer'}>Add Customer</a></li>
        <li className={styles['nav-item']}><a href={'/addproducts'}>Add Products</a></li>
      </ul>
    </div>
  );
}

export default NavBar;
