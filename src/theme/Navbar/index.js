import React from 'react';
import NavbarLayout from '@theme-original/Navbar/Layout';
import NavbarContent from '@theme-original/Navbar/Content';
import styles from './index.module.css';

export default function Navbar() {
  return (
    <>
      <a href="https://www.standwithminnesota.com/" target="__blank" className={styles.topBar}>
        <span>
          <strong>Minnesotans are being repressed by a violent regime</strong>
          <br />
          <u>Find out how you can help!</u>
        </span>
      </a>
      <NavbarLayout>
        <NavbarContent />
      </NavbarLayout>
    </>
  );
}
