import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './LoginForm.module.scss';
import { TextField } from '#/common/TextField';
import { useRouter } from 'next/router';
import { useLoading } from '#/context/useLoading';
import { Button } from '#/common/Button';
import { auth } from '#/firebase/firebase';
import { useAuth } from '#/context/useAuth';

type LoginFormValues = {
  username: string;
  password: string;
  rememberMe: boolean;
};

interface LoginFormProps {
  fieldUser?: any;
  fieldPassword?: any;
  onSubmit: (e: any) => void;
  onSignUpHandler: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  fieldUser = 'username',
  fieldPassword = 'password',
  onSignUpHandler,
}) => {
  const router = useRouter();
  const { isAuthLoading, login, accessToken } = useAuth();
  const { setLoading } = useLoading();
  const { handleSubmit, register } = useForm<LoginFormValues>();

  const [error, setError] = useState('');

  useEffect(() => {
    handleAuth()
  }, [])

  const handleAuth = () => {
    if (!isAuthLoading && accessToken) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        router?.push('/home')
      }, 3000);
    }
  }

  const onSubmitForm = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      const { username, password } = data;
      const accessToken: any = await auth.signInWithEmailAndPassword(username, password);
      // console.log('accessToken', accessToken);
      // console.log('accessToken?.user', accessToken?.user?.multiFactor?.user?.uid);
      router.push('/home');
      login(accessToken?.user?.multiFactor?.user?.uid);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmitForm)}>
      <h2 className={styles.title}>Login</h2>
      {error && (
        <div className={styles.errorSection}>
          <p>{error}</p>
        </div>
      )}
      <div className={styles.formGroup}>
        <TextField
          label='Username'
          id='username'
          name={fieldUser}
          register={register}
        />
      </div>
      <div className={styles.formGroup}>
        <TextField
          label='Password'
          type='password'
          id='password'
          name={fieldPassword}
          register={register}
        />
      </div>
      <Button type="submit" className={styles.loginButton}>
        Login
      </Button>
      {onSignUpHandler && (
        <div className={styles.signUpWrapper}>
          <span onClick={onSignUpHandler}>Create New Account</span>
        </div>
      )}
    </form>
  );
};

export default LoginForm;
