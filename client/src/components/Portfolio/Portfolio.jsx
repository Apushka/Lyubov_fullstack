import React, { useEffect, useState } from 'react';
import styles from './Portfolio.module.css';
import header from '../../assets/images/portfolio/portfolio_header.jpg';
import Modal from '../Modal/Modal';

const Portfolio = (props) => {
    const [modal, setModal] = useState(false);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        document.addEventListener('keydown', handleKeydown);
        return () => {
            document.removeEventListener('keydown', handleKeydown);
        }
    })

    const handleKeydown = (event) => {
        if (event.keyCode === 39) {
            event.target.setAttribute('id', 'increase');
            onNextOrPrevPhotoClick(event);
        }
        else if (event.keyCode === 37) {
            event.target.setAttribute('id', 'decrease');
            onNextOrPrevPhotoClick(event);
        }
    }

    const onOpenGallery = (e) => {
        setIndex(Number(e.target.getAttribute('index')));
        setModal(true);
    }

    const onNextOrPrevPhotoClick = (e) => {
        const action = e.target.getAttribute('id');
        if (props.gallery.length > 0) {
            switch (action) {
                case 'decrease': {
                    if (index - 1 < 0) {
                        setIndex(props.gallery.length - 1)
                    } else {
                        setIndex(index - 1);
                    }
                    break;
                }
                case 'increase': {
                    if (index + 1 > props.gallery.length - 1) {
                        setIndex(0)
                    } else {
                        setIndex(index + 1);
                    }
                    break;
                }
            }
        }
    }


    return (
        <div className={styles.portfolio}>
            <div className={styles.portfolio__container}>
                <div className={styles.portfolio__body}>
                    <div className={styles.header__container}>
                        <img src={header} />
                    </div>
                    <div className={styles.gallery__container}>
                        <div className={styles.gallery}>
                            {props.gallery.map((item, index) => {
                                return <div className={styles.image} key={item} onClick={onOpenGallery}>
                                    <img className={styles.picture} src={item} index={index} alt='nothing' />
                                </div>
                            })}
                        </div>
                    </div>
                </div>
            </div>
            {modal && <Modal modal={modal} setModal={setModal}>
                <div className={styles.gallery__modal}>
                    <div className={styles.backward} id='decrease' onClick={onNextOrPrevPhotoClick}></div>
                    <img src={props.gallery[index]} alt='nothing' />
                    <div className={styles.forward} id='increase' onClick={onNextOrPrevPhotoClick}></div>
                </div>
            </Modal>}
        </div>
    )
}

export default Portfolio;