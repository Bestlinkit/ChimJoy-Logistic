import React from 'react';

interface EmailCardProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const EmailCard: React.FC<EmailCardProps> = ({ children, style }) => {
  return <div style={{ ...cardStyle, ...style }}>{children}</div>;
};

const cardStyle: React.CSSProperties = {
  backgroundColor: '#F8FAFC',
  borderRadius: '16px',
  padding: '20px 24px',
  margin: '20px 0',
  border: '1px solid #E2E8F0',
};
