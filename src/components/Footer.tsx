import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.col}>
                    <h3 className={styles.brand}>Nebula</h3>
                    <p className={styles.text}>Building the future of the web, one pixel at a time.</p>
                </div>
                <div className={styles.col}>
                    <h4 className={styles.heading}>Links</h4>
                    <a href="#home" className={styles.link}>Home</a>
                    <a href="#features" className={styles.link}>Features</a>
                    <a href="#contact" className={styles.link}>Contact</a>
                </div>
                <div className={styles.col}>
                    <h4 className={styles.heading}>Social</h4>
                    <a href="#" className={styles.link}>Twitter</a>
                    <a href="#" className={styles.link}>GitHub</a>
                    <a href="#" className={styles.link}>LinkedIn</a>
                </div>
            </div>
            <div className={styles.copyright}>
                &copy; {new Date().getFullYear()} Nebula Web App. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
