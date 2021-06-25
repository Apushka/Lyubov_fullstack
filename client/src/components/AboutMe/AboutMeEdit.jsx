import React, { useState } from 'react';
import styles from '../AboutMe/AboutMe.module.css';
import AboutMeModal from './Modal/AboutMeModal';
import avatar from '../../assets/images/aboutme/aboutMe__header.jpg';
import Modal from '../Modal/Modal';

const AboutMeEdit = (props) => {
    const [modal, setModal] = useState(false);

    const onEditButton = () => {
        setModal(true);
    }

    return (
        <div className={styles.aboutme}>
            <div className={styles.aboutme__container}>
                <div className={styles.aboutme__body}>
                    <div className={styles.header__container}>
                        <img src={avatar} alt='avatar' />
                    </div>
                    <div className={styles.aboutmeInfo}>
                        <p>{props.aboutInfo.aboutMe}</p>
                        <span className={styles.edit} onClick={onEditButton}></span>
                    </div>
                </div>
                {modal && <Modal modal={modal} setModal={setModal}>
                    <AboutMeModal {...props} setModal={setModal} />
                </Modal>}
            </div>
        </div>
    )
}

export default AboutMeEdit;