import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import useForm from 'hooks/use-form';

import { authModel } from 'entities/auth';

import { useAppDispatch } from 'shared/lib';

import styles from './styles.module.css';

const initFormData: TLoginParams = {
  email: '',
  password: '',
};

export const LoginPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form, setValue] = useState<TLoginParams>(initFormData);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    name && value && setValue({ ...form, [name]: value });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    dispatch(authModel.actions.login(form));
  };

  const formRef = useForm(handleSubmit);

  return (
    <main className={`${styles.layout}`}>
      <form className={`mb-20`} ref={formRef}>
        <h1 className={'text text_type_main-medium'}>Вход</h1>
        <EmailInput
          extraClass={'mt-6 mb-6'}
          name={'email'}
          value={form.email}
          onChange={onChange}
          placeholder={'E-mail'}
        />
        <PasswordInput
          extraClass={'mb-6'}
          name={'password'}
          value={form.password}
          onChange={onChange}
          placeholder={'Пароль'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'}>
          Войти
        </Button>
      </form>
      <ul className={styles.links}>
        <li className={'mb-4'}>
          <p className={'text text_type_main-default text_color_inactive'}>
            Вы новый пользователь?
            <Link to='/register' className={`ml-2 ${styles.link} text_color_accent`}>
              Зарегистрироваться
            </Link>
          </p>
        </li>
        <li>
          <p className={'text text_type_main-default text_color_inactive'}>
            Забыли пароль?
            <Link to='/forgot-password' className={`ml-2 ${styles.link} text_color_accent`}>
              Восстановить пароль
            </Link>
          </p>
        </li>
      </ul>
    </main>
  );
};