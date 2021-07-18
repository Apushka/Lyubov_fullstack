import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../Login/LoginModal.module.css';

const LoginModal = (props) => {
    const { register, handleSubmit } = useForm();

    const onLogin = (formData) => {
        props.login(formData);
        props.setModal(false);
    }

    return (
        <div className={styles.login__body}>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit(onLogin)}>
                <div>
                    <label htmlFor='email'>E-mail</label>
                    <br />
                    <input {...register('email')} type='text' />
                </div>
                <div>
                    <label htmlFor='password'>Пароль</label>
                    <br />
                    <input {...register('password')} type='password' />
                </div>
                <div>
                    <button className={styles.enter}>Войти</button>
                </div>
            </form>
        </div>
    )
}

export default LoginModal;