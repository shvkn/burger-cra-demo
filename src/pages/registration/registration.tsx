import React, { ChangeEvent, FC, useState } from 'react';
import styles from './registration.module.css';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import * as authActions from 'services/actions/auth';
import { TRegisterParams } from 'services/types';
import { useAppDispatch } from 'services/slices';
import useForm from 'hooks/use-form';

const initFormData: TRegisterParams = {
  name: '',
  email: '',
  password: '',
};

const RegistrationPage: FC = () => {
  const [form, setValue] = useState<TRegisterParams>(initFormData);
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue({ ...form, [name]: value });
  };

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    dispatch(authActions.register(form));
  };

  const formRef = useForm(handleSubmit);

  return (
    <main className={`${styles.layout}`}>
      <form className={`mb-20`} ref={formRef}>
        <h1 className={'text text_type_main-medium'}>Регистрация</h1>
        <Input
          extraClass={'mt-6 mb-6'}
          name={'name'}
          value={form.name}
          onChange={onChange}
          placeholder={'Имя'}
        />
        <EmailInput
          extraClass={'mt-6 mb-6'}
          name={'email'}
          value={form.email}
          onChange={onChange}
          placeholder={'E-mail'}
        />
        <PasswordInput
          extraClass={'mt-6 mb-6'}
          name={'password'}
          value={form.password}
          onChange={onChange}
          placeholder={'Пароль'}
        />
        <Button htmlType={'submit'} type={'primary'} size={'large'}>
          Зарегистрироваться
        </Button>
      </form>
      <p className={'text text_type_main-default text_color_inactive'}>
        Уже зарегистрированы?
        <Link to='/login' className={`ml-2 ${styles.link} text_color_accent`}>
          Войти
        </Link>
      </p>
    </main>
  );
};

export default RegistrationPage;
