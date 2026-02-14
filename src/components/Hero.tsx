import React from 'react';
import styles from './Hero.module.css';

const Hero: React.FC = () => {
    return (
        <section id="home" className={styles.hero}>
            <div className={styles.backgroundGlow}></div>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Design the <span className={styles.highlight}>Extraordinary</span>
                </h1>
                <p className={styles.subtitle}>
                    Build immersive web experiences with modern tools and cutting-edge performance.
                    Simple, fast, and beautiful.
                </p>
                <div className={styles.actions}>
                    <button className={styles.primaryBtn}>Get Started</button>
                    <button className={styles.secondaryBtn}>Learn More</button>
                </div>
            </div>

            {/* Detailed visual element if requested, keeping it simple but bold for now */}
            <div className={styles.visual}>
                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                        <span className={styles.dot}></span>
                    </div>
                    <div className={styles.cardBody}>
                        <div className={styles.skeletonLine} style={{ width: '80%' }}></div>
                        <div className={styles.skeletonLine} style={{ width: '60%' }}></div>
                        <div className={styles.skeletonBlock}></div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
