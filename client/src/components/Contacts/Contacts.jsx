import React, { useState } from 'react';
import styles from './Contacts.module.css';
import { useForm } from 'react-hook-form';
import Modal from '../Modal/Modal';

const Contacts = (props) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [modal, setModal] = useState(props.contacts.sent);

    const onSendMessage = (formData) => {
        props.sendMessage(formData);
        setModal(true);
        reset();
    }
    return (
        <div className={styles.contacts__wrapper}>
            <div className={styles.contacts__container}>
                <div className={styles.contacts__body}>
                    <form onSubmit={handleSubmit(onSendMessage)}>
                        <h2>Напишите мне </h2>
                        <div className={styles.name}>
                            <label htmlFor='name'>Имя</label>
                            <input {...register('name', {
                                required: {
                                    value: true,
                                    message: 'Введите Ваше имя'
                                }
                            })} type='text' placeholder='Ваше имя' />
                            {errors.name && <span className={styles.error}>{errors.name.message}</span>}
                        </div>

                        <div className={styles.email}>
                            <label htmlFor='email'>E-mail</label><br />
                            <input {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Введите Ваш e-mail'
                                }
                            })} type='text' placeholder='Ваш e-mail' />
                            {errors.email && <span className={styles.error}>{errors.email.message}</span>}
                        </div>

                        <div className={styles.phone}>
                            <label htmlFor='phone'>Телефон</label><br />
                            <input {...register('phone', {
                                pattern: {
                                    value: /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/,
                                    message: 'Неверный формат'
                                }
                            })} type='text' placeholder='Ваш номер телефона' />
                            {errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
                        </div>

                        <div className={styles.subject}>
                            <label htmlFor='subject'>Тема</label><br />
                            <div className={styles.select__container}>
                                <select {...register('subject', {
                                    required: true,
                                    message: 'Выберите тему для разговора'
                                })}>
                                    <option defaultValue>Коммерческая съемка</option>
                                    <option>Реклама</option>
                                    <option>Сотрудничество</option>
                                    <option>Другое</option>
                                </select>
                            </div>
                            {errors.subject && <span className={styles.error}>{errors.subject.message}</span>}
                        </div>

                        <div className={styles.message}>
                            <textarea {...register('message', {
                                required: {
                                    value: true,
                                    message: 'Напишите мне что-нибудь'
                                },
                                maxLength: {
                                    value: 3500,
                                    message: 'Сообщение слишком большое'
                                }
                            })} type='text' placeholder='Ваше сообщение...' />
                            {errors.message && <span className={styles.error}>{errors.message.message}</span>}
                        </div>
                        <div className={styles.send__button}>
                            <label htmlFor='send'>Отправить</label>
                            <button type='submit' id='send' />
                        </div>
                    </form>
                </div>
            </div>
            {modal && <Modal modal={modal} setModal={setModal}>
                <div className={styles.sent__body}>
                    <span className={styles.thanks}><p>Спасибо!</p><p>Ваше письмо отправлено</p></span>
                </div>
            </Modal>}
        </div>
    )
}

export default Contacts;