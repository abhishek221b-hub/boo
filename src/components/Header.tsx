import React, { useState } from 'react';
import styles from './Header.module.css';

const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logo}>Nebula</div>
                <button
                    className={styles.menuToggle}
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle navigation"
                >
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                    <span className={styles.bar}></span>
                </button>
                <nav className={`${styles.nav} ${isOpen ? styles.open : ''}`}>
                    <a href="#home" className={styles.navLink} onClick={() => setIsOpen(false)}>Home</a>
                    <a href="#features" className={styles.navLink} onClick={() => setIsOpen(false)}>Features</a>
                    <a href="#contact" className={styles.navLink} onClick={() => setIsOpen(false)}>Contact</a>
                    <button className={styles.navButton}>Sign Up</button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
