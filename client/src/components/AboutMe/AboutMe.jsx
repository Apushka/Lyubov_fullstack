import React from 'react';
import styles from '../AboutMe/AboutMe.module.css';
import avatar from '../../assets/images/aboutme/aboutMe__header.jpg';


const AboutMe = (props) => {

    return (
        <div className={styles.aboutme}>
            <div className={styles.aboutme__container}>
                <div className={styles.aboutme__body}>
                    <div className={styles.header__container}>
                        <img src={avatar} alt='avatar' />
                    </div>
                    <div className={styles.aboutmeInfo}>
                        <p>{props.aboutInfo.aboutMe}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutMe;