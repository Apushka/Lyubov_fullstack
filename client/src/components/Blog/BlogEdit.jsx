import React, { useState } from 'react';
import styles from './BlogEdit.module.css';
import { useHistory } from 'react-router-dom';

const BlogEdit = (props) => {

    const history = useHistory();

    const onCreateNewPost = (e) => {
        history.push(`/blog/post/${'create'}`);
    }

    const onDeletePost = (e) => {
        props.deletePost(e.target.id);
    }

    const onPostClick = (e) => {
        const id = e.currentTarget.getAttribute('id');
        history.push(`/blog/post/${id}`);
    }

    return (
        <div className={styles.blog__container}>
            <div className={styles.blog__body}>
                <div className={styles.create__post__container}>
                    <span className={styles.create__post} onClick={onCreateNewPost}></span>
                </div>
                {props.posts.map((item, index) => {
                    return <article className={styles.post} key={index} >
                        <span className={styles.category}>{item.category}</span>
                        <div className={styles.post__body} onClick={onPostClick} id={item._id}>
                            <time>{item.date.includes('Updated') ? 'Обновлено ' + new Date(item.date).toLocaleString() : 'Добавлено ' + new Date(item.date).toLocaleString()}</time>
                            <h2>{item.title}</h2>
                            <p>{item.body.slice(0, 200) + '...'}</p>
                        </div>
                        <span className={styles.update} index={index} id={item._id} title={item.title} body={item.body} onClick={onPostClick}></span>
                        <span className={styles.delete} id={item._id} onClick={onDeletePost}></span>
                    </article>
                })}
            </div>
        </div >
    )
}

export default BlogEdit;