
import React from 'react';

const AuthLogo: React.FC = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-2">
        <span className="text-primary font-display text-3xl font-semibold" style={{ color: '#33254C' }}>Legal</span>
        <span className="text-foreground font-display text-3xl">Flux</span>
      </div>
      <p className="text-muted-foreground">Gestão jurídica simplificada</p>
    </div>
  );
};

export default AuthLogo;
