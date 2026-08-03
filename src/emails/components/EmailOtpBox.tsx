import React from 'react';

interface EmailOtpBoxProps {
  code: string;
  expiryMinutes?: number;
}

export const EmailOtpBox: React.FC<EmailOtpBoxProps> = ({
  code,
  expiryMinutes = 10,
}) => {
  return (
    <div style={containerStyle}>
      <div style={codeBoxStyle}>{code}</div>
      <p style={expiryTextStyle}>
        ⏱ Code expires in <strong>{expiryMinutes} minutes</strong>
      </p>
    </div>
  );
};

const containerStyle: React.CSSProperties = {
  textAlign: 'center',
  margin: '24px 0',
};

const codeBoxStyle: React.CSSProperties = {
  backgroundColor: '#0B192C',
  color: '#9BC800',
  fontSize: '32px',
  fontWeight: 900,
  letterSpacing: '8px',
  padding: '18px 24px',
  borderRadius: '16px',
  display: 'inline-block',
  border: '2px solid #9BC800',
  boxShadow: '0 8px 20px rgba(11, 25, 44, 0.2)',
};

const expiryTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  fontWeight: 600,
  marginTop: '12px',
};
