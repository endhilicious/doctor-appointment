import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.scss';
import { AVATAR_DEFAULT } from '#/constants';
import Image from 'next/image';

const Sidebar: React.FC = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.sidebarProfile}>
        <div>
          <Image width={50} height={50} src={AVATAR_DEFAULT} alt='user-image'/>
        </div>
        <div>
          <div className={styles.nameUser}>Muhammad Aryandi</div>
          <div className={styles.statusUser}>Patient</div>
          <div className={styles.locationUser}>Makassar, Indonesia</div>
        </div>
      </div>
      <ul className={styles.navList}>
        <li>
          <Link href="/home">
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link href="/appointment">
            <span>Appointments</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
