import React, { useState } from 'react';
import Modal from '../../Modal/Modal';
import BlogPhotoModal from '../Modal/BlogPhotoModal/BlogPhotoModal';
import styles from './Post.module.css';

const Post = ({ post }) => {
    const [modal, setModal] = useState(false);
    const [link, setLink] = useState('');

    const onPhotoClick = (e) => {
        document.body.classList.add('lock');
        setLink(e.target.src);
        setModal(true);
    }

    return (
        <div className={styles.post__container}>
            <article className={styles.post}>
                <h2 className={styles.title}>{post.title}</h2>
                {post.headerMedia && <div className={styles.headerMedia__container}>
                    <div className={styles.headerMedia}>
                        {(post.headerMedia.endsWith('.jpg') ||
                            post.headerMedia.endsWith('.jpeg') ||
                            post.headerMedia.endsWith('.png')) && <img src={post.headerMedia} />}

                        {post.headerMedia.endsWith('.mp4') && <video src={post.headerMedia} controls='controls' autoPlay />}
                    </div>
                </div>}
                <div className={styles.post__body__container}>
                    <p>{post.body}</p>
                </div>
                {post.photo && <div className={styles.photo__gallery}>
                    {post.photo.map((item, index) => {
                        return <div className={styles.photo__container} key={item} onClick={onPhotoClick}>
                            <img src={item} />
                        </div>
                    })}
                </div>}
                {post.video && <div className={styles.video__gallery}>
                    {post.video.map((item, index) => {
                        return <div className={styles.video__container} key={item}>
                            <video src={item} type='video/mp4' controls='controls'></video>
                        </div>
                    })}
                </div>}
            </article>
            {modal && <Modal modal={modal} setModal={setModal}>
                <BlogPhotoModal link={link} setModal={setModal} />
            </Modal>}
        </div>
    )
}

export default Post;