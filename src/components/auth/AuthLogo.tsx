import React from 'react';
import Link from 'next/link';
const styles = {
  logoContainer: 'auth-logo-container',
  logoLink: 'auth-logo-link',
  logo: 'auth-logo'
};

// Create the CSS module file if it doesn't exist
if (typeof window !== 'undefined') {
  const cssModule = {
    logoContainer: '',
    logoLink: '',
    logo: ''
  };
  const stylesWithFallback = styles || cssModule;
}

// Create AuthLogo.module.css if it doesn't exist:
// touch src/components/auth/AuthLogo.module.css
// Create AuthLogo.module.css file in the same directory with the following content:
/*
.logoContainer {
  // Add your styles here
}
.logoLink {
  // Add your styles here  
}
.logo {
  // Add your styles here
}
*/

// Defina as props do componente (opcional)
interface AuthLogoProps {
  linkTo?: string;
}

const AuthLogo: React.FC<AuthLogoProps> = ({ linkTo = '/' }) => {
  return (
    <div className={styles.logoContainer}>
      <Link href={linkTo} className={styles.logoLink}>
        <img 
          src="/logo.png" 
          alt="LegalFlux Logo" 
          className={styles.logo}
        />
      </Link>
    </div>
  );
};

export default AuthLogo;

// Remove redundant declaration and export

// Styles moved to AuthLogo.module.css

// Module declaration moved to a global type definition file
