import React, { useState } from 'react'
import styles from './Footer.module.css'
import LoginModal from '../Login/LoginModal';
import Modal from '../Modal/Modal';


const Footer = (props) => {
    const [modal, setModal] = useState(false);

    const onEnterClick = () => {
        setModal(true);
    }

    const onExitClick = () => {
        props.logout(props.email);
    }

    return (
        <footer className={styles.footer}>
            <div className={styles.footer__container}>
                <div className={styles.footer__body}>
                    <div className={styles.links}>
                        <a href='https://vk.com/lyubovmua' target='blank' className={styles.vk__link} ></a>
                        <a href='https://www.facebook.com/lyubovmua' target='blank' className={styles.fb__link} ></a>
                        <a href='https://www.instagram.com/lyubovmua/' target='blank' className={styles.instagram__link} ></a>
                    </div>
                    <div className={styles.credits}>
                        <p>© Lyubov Rassolova 2021</p>
                    </div>
                    <div className={styles.cabinet}>
                        {!props.isAuth && <div className={styles.enter} onClick={onEnterClick}></div>}
                        {props.isAuth && <div className={styles.exit} onClick={onExitClick}></div>}
                        {modal && <Modal setModal={setModal} modal={modal}>
                            <LoginModal setModal={setModal} login={props.login} logout={props.logout} />
                        </Modal>}
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;