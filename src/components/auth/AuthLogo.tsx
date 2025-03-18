import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthLogo.module.css'; // Assuming you are using CSS Modules

const AuthLogo: React.FC = () => {
  return (
    <Link to="/" className={styles.logoLink} aria-label="LegalFlux Home">
      <div className={styles.logoContainer}>
        <span className={styles.logoTextPrimary}>Legal</span>
        <span className={styles.logoText}>Flux</span>
      </div>
      <p className={styles.logoSubtitle}>Gestão jurídica simplificada</p>
    </Link>
  );
};

export default AuthLogo;
