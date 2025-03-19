import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthLogo.module.css'; // Usando CSS Modules

// Defina as props do componente (opcional)
interface AuthLogoProps {
  showSubtitle?: boolean; // Prop para controlar a exibição do subtítulo
}

const AuthLogo: React.FC<AuthLogoProps> = ({ showSubtitle = true }) => {
  return (
    <Link to="/" className={styles.logoLink} aria-label="LegalFlux Home">
      <div className={styles.logoContainer}>
        <span className={styles.logoTextPrimary}>Legal</span>
        <span className={styles.logoText}>Flux</span>
      </div>
      {/* Exibe o subtítulo apenas se showSubtitle for true */}
      {showSubtitle && (
        <p className={styles.logoSubtitle}>Gestão jurídica simplificada</p>
      )}
    </Link>
  );
};

export default AuthLogo;
