import React from 'react'
import LoginForm from '#/components/LoginForm/LoginForm'

import styles from './LoginView.module.scss';
import { useRouter } from 'next/router';

const LoginView = () => {
  const router = useRouter();

  const handleSubmit = () => router.push('home');
  const handleSignUp = () => router.push('/register');

  return (
    <div className={styles.loginViewContainer}>
      <LoginForm
        onSubmit={handleSubmit}
        onSignUpHandler={handleSignUp}
      />
    </div>
  )
}

export default LoginView