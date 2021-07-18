import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'
import logo from '../../assets/images/logo.svg';

const Header = (props) => {
    const [active, setActive] = useState(false);

    const toggleClass = (e) => {
        setActive(!active);
    }
    active ? document.body.classList.add('lock') : document.body.classList.remove('lock');  

    const deleteActive = (e) => {
        setTimeout(() => setActive(false), 300)
    }

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header__body}>
                    <div className={styles.logo}>
                        <NavLink to='/main'><img src={logo} alt='banner here' /></NavLink>
                    </div>
                    <div className={`${styles.menu_burger} ${active ? styles.active : ''}`} onClick={toggleClass}>
                        <span></span>
                    </div>
                    <nav className={`${styles.menu} ${active ? styles.active : ''}`}>
                        <ul className={styles.list} onClick={deleteActive}>
                            <li><NavLink to='/about' activeClassName={styles.linkActive}>Обо мне </NavLink></li>
                            <li><NavLink to='/portfolio' activeClassName={styles.linkActive}>Портфолио</NavLink></li>
                            <li><NavLink to={`/blog/${'all'}`} activeClassName={styles.linkActive}> Блог</NavLink></li>
                            <li><NavLink to='/contacts' activeClassName={styles.linkActive}>Контакты</NavLink></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default Header;