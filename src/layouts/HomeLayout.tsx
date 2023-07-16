import { ReactNode, useEffect } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { useAuth } from '#/context/useAuth';

import { Sidebar } from '#/components/Sidebar';
import TopBar from '#/components/TopBar/TopBar';

import styles from './HomeLayout.module.scss';
import { useLoading } from '#/context/useLoading';
import { useSnackbar } from '#/context/useSnackbar';

type HomeLayoutProps = {
  children: ReactNode;
};

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { openSnackbar } = useSnackbar();
  const { isLoading, setLoading } = useLoading();
  const { isAuthLoading, accessToken } = useAuth();
  const sidebarClass = cx(styles.sidebar, styles.responsiveSidebar);
  
  useEffect(() => {
    handleAuth()
  }, [])
  const handleAuth = () => {
    if (!isAuthLoading && !accessToken) {
      setLoading(true)
      openSnackbar('You are not authorized to access this page.', 'success', 'top');
      setTimeout(() => {
        setLoading(false)
        router?.push('/')
      }, 3000);
    }
  }


  return (
    <div className={styles.container}>
      <div className={sidebarClass}>
        <Sidebar />
      </div>
      <div className={styles.contentWrapper}>
        <div>
          <TopBar />
        </div>
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default HomeLayout;
