import React from 'react';
import styles from './Main.module.css';
import { NavLink } from 'react-router-dom';
import video from '../../assets/images/main/videoBackground.mp4';


const Main = (props) => {

    return (
        <div className={styles.main}>
            <div className={styles.main__container}>
                <div className={styles.main__body}>
                    <div className={styles.video__container}>
                        <video className={styles.video__background} src={video} type='video/mp4' autoPlay='autoplay' muted loop='loop' playsInline />
                    </div>
                    <div className={styles.content}>
                        <div className={styles.row}>
                            <span className={styles.info}>
                                <div className={styles.text}>Your lips<br />are your feelings</div>
                                <div className={styles.readMore}><NavLink to='/about'>Read more</NavLink></div>
                            </span>
                            <span className={styles.image}></span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.info}>
                                <div className={styles.text}>Your lips<br />are your feelings</div>
                                <div className={styles.readMore}><NavLink to='/portfolio'>Read more</NavLink></div>
                            </span>
                            <span className={styles.image}></span>
                        </div>

                        <div className={styles.row}>
                            <span className={styles.info}>
                                <div className={styles.text}>Your lips<br />are your feelings</div>
                                <div className={styles.readMore}><NavLink to={`/blog/${'all'}`}>Read more</NavLink></div>
                            </span>
                            <span className={styles.image}></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main;