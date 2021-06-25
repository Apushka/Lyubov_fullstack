import React, { useEffect, useRef, useState } from 'react';
import styles from './Modal.module.css';

const Modal = ({ modal, setModal, children }) => {
    const [currentModal, setCurrentModal] = useState(false);
    
    useEffect(() => {
        if (modal) {
            document.addEventListener('keydown', handleKeydown);
            setTimeout(() => {
                document.body.classList.add('lock');
                setCurrentModal(modal);
            }, 50)
        }
        return () => { 
            document.body.classList.remove('lock');
            document.removeEventListener('keydown', handleKeydown);
        }
    }, [])

    const handleKeydown = (event) => {
        if (event.keyCode === 27) {
            onCancelOrOutsideClick();
        }
    }

    const onCancelOrOutsideClick = (e) => {
        setTimeout(() => {
            setCurrentModal(false);
            setTimeout(() => {
                setModal(false)
            }, 300)
        }, 150)
    }

    return (
        <div className={`${styles.modal__container} ${currentModal ? styles.active : ''}`}>
            <div className={styles.modal} onClick={onCancelOrOutsideClick}>
                <div className={styles.main} onClick={(e) => e.stopPropagation()}>
                    {children}
                    {/* {(  children._owner.elementType.name !== 'Blog' && 
                        children._owner.elementType.name !== 'Contacts' &&
                        children._owner.elementType.name !== 'Portfolio' && 
                        children._owner.elementType.name !== 'Footer' &&
                        children._owner.elementType.name !== 'AboutMeEdit') && <button className={styles.cancel} type='reset' onClick={onCancelOrOutsideClick}>Cancel</button>} */}
                    {/* {(  children._owner.elementType.name === 'Blog' || 
                        children._owner.elementType.name === 'Contacts' || 
                        children._owner.elementType.name === 'Portfolio' ||
                        children._owner.elementType.name === 'Footer' ||
                        children._owner.elementType.name === 'AboutMeEdit') && <span className={styles.close} onClick={onCancelOrOutsideClick}></span>} */}
                        <span className={styles.close} onClick={onCancelOrOutsideClick}></span>
                </div>
            </div>
        </div>
    )
}

export default Modal;