import React from 'react';
import { useForm } from 'react-hook-form';
import styles from '../Modal/AboutMeModal.module.css';

const AboutMeModal = (props) => {
    const { register, handleSubmit } = useForm();

    const onUpdateAboutMe = (formData) => {
        formData._id = props.aboutInfo._id;
        props.updateAboutMe(formData);
        props.setModal(false);
    }

    return (
        <div className={styles.aboutMe__modal__body}>
            <form onSubmit={handleSubmit(onUpdateAboutMe)}>
                <h2>Расскажи о себе</h2>
                <div>
                    <textarea {...register('aboutMe')} type='text' id='aboutMe' defaultValue={props.aboutInfo.aboutMe} />
                </div>
                <div>
                    <button>Сохранить</button>
                </div>
            </form>
        </div>
    )
}

export default AboutMeModal;