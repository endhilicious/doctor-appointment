import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { FaBars, FaUser } from 'react-icons/fa';
import { RiLogoutBoxLine, RiSettingsLine } from 'react-icons/ri';
import styles from './TopBar.module.scss';
import { useOutsideClick } from '#/context/useOutsideClick';
import { useRouter } from 'next/router';
import { useAuth } from '#/context/useAuth';

interface Breadcrumb {
  url: string;
  label: string;
}

interface TopBarProps {
  breadcrumbs?: Breadcrumb[];
  handleToggleSidebar?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  breadcrumbs = [], 
  handleToggleSidebar
}) => {
  const { logout } = useAuth();
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const ref = useRef(null);

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  const closeModal = () => {
    setIsUserMenuOpen(false);
  };

  useOutsideClick({ ref, callback: closeModal });

  const handleLogout = () => {
    logout();
    router?.push('/')
  };

  return (
    <div className={styles.topBar}>
      <div className={styles.breadcrumbs}>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className={styles.breadcrumbSeparator}>/</span>}
            <Link href={breadcrumb.url}>
              <span className={styles.breadcrumbLink}>{breadcrumb.label}</span>
            </Link>
          </React.Fragment>
        ))}
        <div className={styles.mobileMenuButton} onClick={handleToggleSidebar}>
          <FaBars />
        </div>
      </div>
      <div className={styles.userMenu}>
        <div className={styles.userIcon} onClick={handleUserMenuToggle}>
          <FaUser />
        </div>
        {isUserMenuOpen && (
          <ul className={styles.userMenuList} ref={ref}>
            <li className={styles.userMenuItem}>
              <RiSettingsLine />
              <span>Settings</span>
            </li>
            <li className={styles.userMenuItem} onClick={handleLogout}>
              <RiLogoutBoxLine />
              <span>Logout</span>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default TopBar;
