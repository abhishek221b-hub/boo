import React from 'react';
import styles from './Features.module.css';

const featuresList = [
    {
        title: 'Blazing Fast',
        description: 'Optimized for speed with zero-config bundling and instant server start.',
        icon: '⚡'
    },
    {
        title: 'Type Safe',
        description: 'Built with TypeScript for robust code and improved developer experience.',
        icon: '🛡️'
    },
    {
        title: 'Modern Design',
        description: 'Beautiful, responsive UI components that look great on any device.',
        icon: '✨'
    },
    {
        title: 'Scalable',
        description: 'Designed to grow with your project, from prototype to enterprise app.',
        icon: '📈'
    }
];

const Features: React.FC = () => {
    return (
        <section id="features" className={styles.features}>
            <div className={styles.container}>
                <h2 className={styles.title}>Why Choose Us</h2>
                <div className={styles.grid}>
                    {featuresList.map((feature, index) => (
                        <div key={index} className={styles.card}>
                            <div className={styles.icon}>{feature.icon}</div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.cardDescription}>{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
