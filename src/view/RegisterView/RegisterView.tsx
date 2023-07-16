import React from 'react'
import { useRouter } from 'next/router';

import RegisterForm from '#/components/RegisterForm/RegisterForm';
import styles from './RegisterView.module.scss';

const RegisterView = () => {
  const router = useRouter();

  const handleSubmit = () => router.push('home');
  const handleSignIn = () => router.push('/');

  return (
    <div className={styles.registerViewContainer}>
      <RegisterForm
        onSubmit={handleSubmit}
        onSignInHandler={handleSignIn}
      />
    </div>
  )
}

export default RegisterView