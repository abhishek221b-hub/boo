import React, { useState } from 'react';
import styles from './Contact.module.css';

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thanks for your message! This is a demo form.');
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className={styles.contact}>
            <div className={styles.container}>
                <h2 className={styles.title}>Get in Touch</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name" className={styles.label}>Name</label>
                        <input
                            type="text"
                            id="name"
                            className={styles.input}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            type="email"
                            id="email"
                            className={styles.input}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="message" className={styles.label}>Message</label>
                        <textarea
                            id="message"
                            className={styles.textarea}
                            rows={5}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className={styles.submitBtn}>Send Message</button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
