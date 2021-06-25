import React from 'react';
import styles from './BlogPhotoModal.module.css';

const BlogPhotoModal = (props) => {

    return <div className={styles.modal__body}>
        <img className={styles.zoomedPhoto} src={props.link} alt='fullsized' />
    </div>
}

export default BlogPhotoModal;