import React, { useEffect } from 'react';
import styles from './Blog.module.css';
import { NavLink } from 'react-router-dom';

const Blog = (props) => {
    return (
        <div className={styles.blog}>
            <div className={styles.blog__container}>
                {/* <div className={styles.header__container}>
                    <img src={avatar} alt='avatar' />
                </div> */}
                <nav className={styles.category}>
                    <NavLink to={`/blog/${'video'}`} className={styles.video__category} >Видео</NavLink>
                    <NavLink to={`/blog/${'makeupbag'}`} className={styles.makeupbag__category } >Косметичка</NavLink>
                    <NavLink to={`/blog/${'life'}`} className={styles.life__category} >Life</NavLink>
                </nav>
                <div className={styles.blog__body}>
                    <div className={styles.posts__container}>
                        {props.posts.map((item, index) => {
                            return <article className={styles.post} key={index}>
                                <h2>{item.title}</h2>
                                {item.headerMedia && <div className={styles.headerMedia__container}>
                                    <div className={styles.headerMedia}>
                                        {(item.headerMedia.endsWith('.jpg') ||
                                            item.headerMedia.endsWith('.jpeg') ||
                                            item.headerMedia.endsWith('.png')) && <img src={item.headerMedia} />}

                                        {item.headerMedia.endsWith('.mp4') && <video src={item.headerMedia} controls='controls' autoPlay muted />}
                                    </div>
                                </div>}
                                <div className={styles.body__container}>
                                    <p>{item.body.slice(0, 150) + '...'}</p>
                                    <span className={styles.readMore}><NavLink to={`/blog/post/${item._id}`} >Read more</NavLink></span>
                                </div>
                            </article>
                        })}
                    </div>
                    <div className={styles.search}>
                        <input type='text' id='search' placeholder='найти...' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blog;