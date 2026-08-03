import React from 'react';
import { Button } from '@react-email/components';

interface EmailButtonProps {
  href: string;
  variant?: 'lemon' | 'navy' | 'royal';
  children: React.ReactNode;
}

export const EmailButton: React.FC<EmailButtonProps> = ({
  href,
  variant = 'lemon',
  children,
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'lemon':
        return {
          backgroundColor: '#9BC800',
          color: '#0B192C',
          border: '1px solid #9BC800',
        };
      case 'royal':
        return {
          backgroundColor: '#003366',
          color: '#FFFFFF',
          border: '1px solid #003366',
        };
      case 'navy':
      default:
        return {
          backgroundColor: '#0B192C',
          color: '#FFFFFF',
          border: '1px solid #0B192C',
        };
    }
  };

  const buttonStyle: React.CSSProperties = {
    ...baseButtonStyle,
    ...getVariantStyles(),
  };

  return (
    <div style={containerStyle}>
      <Button href={href} style={buttonStyle}>
        {children}
      </Button>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: '24px 0',
};

const baseButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  fontWeight: 800,
  fontSize: '13px',
  letterSpacing: '0.8px',
  textDecoration: 'none',
  padding: '14px 32px',
  borderRadius: '30px',
  textAlign: 'center',
  textTransform: 'uppercase',
  boxShadow: '0 4px 12px rgba(11, 25, 44, 0.12)',
};
