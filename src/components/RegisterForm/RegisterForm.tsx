import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './RegisterForm.module.scss';
import { TextField } from '#/common/TextField';
import { useRouter } from 'next/router';
import { useLoading } from '#/context/useLoading';
import { Button } from '#/common/Button';
import { auth } from '#/firebase/firebase';
import { useAuth } from '#/context/useAuth';

type RegisterFormValues = {
  username: string;
  password: string;
  rememberMe: boolean;
};

interface RegisterFormProps {
  fieldUser?: any;
  fieldPassword?: any;
  onSubmit: (e: any) => void;
  onSignInHandler: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  fieldUser = 'username',
  fieldPassword = 'password',
  onSignInHandler,
}) => {
  const { setLoading } = useLoading();
  const { isAuthLoading, accessToken } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const { handleSubmit, register } = useForm<RegisterFormValues>();
  
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

  const onSubmitForm = async (data: RegisterFormValues) => {
    try {
      setLoading(true);
      const { username, password } = data;
      await auth.createUserWithEmailAndPassword(username, password);
      setLoading(false);
      router.push('/');
    } catch (error: any) {
      setLoading(false);
      setError(error?.message);
    }
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit(onSubmitForm)}>
      <h2 className={styles.title}>Register</h2>
      {error && (
        <div className={styles.errorSection}>
          <p>{error}</p>
        </div>
      )}
      <div className={styles.formGroup}>
        <TextField
          label='Username'
          name={fieldUser}
          register={register}
        />
      </div>
      <div className={styles.formGroup}>
        <TextField
          label='Password'
          type='password'
          name={fieldPassword}
          register={register}
        />
      </div>
      <Button type="submit" className={styles.registerButton}>
        Register
      </Button>
      {onSignInHandler && (
        <div className={styles.signInWrapper}>
          <span onClick={onSignInHandler}>I Have Account!</span>
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
