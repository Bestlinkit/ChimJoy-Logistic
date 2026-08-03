import React from 'react';
import { Section, Text } from '@react-email/components';

interface EmailHeaderProps {
  badge?: string;
  title: string;
}

export const EmailHeader: React.FC<EmailHeaderProps> = ({ badge, title }) => {
  return (
    <Section style={headerSectionStyle}>
      {/* Brand Logo Text / Image fallback */}
      <div style={logoWrapperStyle}>
        <div style={logoBadgeStyle}>
          <span style={dotStyle} />
          CHIMJOY LOGISTICS
        </div>
      </div>

      {badge && <div style={badgeStyle}>{badge}</div>}

      <Text style={titleStyle}>{title}</Text>
    </Section>
  );
};

const headerSectionStyle: React.CSSProperties = {
  backgroundColor: '#0B192C',
  padding: '36px 24px 28px 24px',
  textAlign: 'center',
  borderBottom: '2px solid #9BC800',
};

const logoWrapperStyle: React.CSSProperties = {
  marginBottom: '16px',
};

const logoBadgeStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'rgba(255, 255, 255, 0.12)',
  color: '#FFFFFF',
  fontSize: '11px',
  fontWeight: 900,
  letterSpacing: '2px',
  padding: '6px 14px',
  borderRadius: '20px',
  border: '1px solid rgba(155, 200, 0, 0.4)',
};

const dotStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  backgroundColor: '#9BC800',
  marginRight: '8px',
};

const badgeStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'rgba(155, 200, 0, 0.15)',
  color: '#9BC800',
  fontSize: '10px',
  fontWeight: 800,
  textTransform: 'uppercase',
  letterSpacing: '1.5px',
  padding: '4px 12px',
  borderRadius: '12px',
  marginBottom: '12px',
  border: '1px solid rgba(155, 200, 0, 0.3)',
};

const titleStyle: React.CSSProperties = {
  color: '#FFFFFF',
  fontSize: '22px',
  fontWeight: 800,
  margin: '8px 0 0 0',
  letterSpacing: '-0.4px',
  lineHeight: '1.3',
};
