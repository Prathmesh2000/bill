import React, { useState } from "react";
import styles from "./NavBar.module.scss";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={styles['nav-container']}>
      {/* Hamburger Icon */}
      <div className={styles['hamburger']} onClick={toggleMenu}>
        <span className={isOpen ? styles['bar-open'] : styles['bar']}></span>
        <span className={isOpen ? styles['bar-open'] : styles['bar']}></span>
        <span className={isOpen ? styles['bar-open'] : styles['bar']}></span>
      </div>

      {/* Navigation Menu */}
      <ul className={`${styles['nav-list']} ${isOpen ? styles['nav-list-open'] : ''}`}>
        <li className={styles['nav-item']}><a href="/">Main</a></li>
        <li className={styles['nav-item']}><a href="/orders">Orders</a></li>
        <li className={styles['nav-item']}><a href="/addsalsesmen">Add Salesman</a></li>
        <li className={styles['nav-item']}><a href="/addcustomer">Add Customer</a></li>
        <li className={styles['nav-item']}><a href="/addproducts">Add Products</a></li>
      </ul>
    </div>
  );
};

export default NavBar;
