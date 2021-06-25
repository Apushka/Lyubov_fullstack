import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'
import logo from '../../assets/images/logo.svg';

const Header = (props) => {

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.header__body}>
                    <div className={styles.logo}>
                        <NavLink to='/main'><img src={logo} alt='banner here' /></NavLink>
                    </div>
                    <nav className={styles.menu}>
                        <ul className={styles.list}>
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