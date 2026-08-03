import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailButton } from '../components/EmailButton';

interface PasswordChangedEmailProps {
  name?: string;
  loginUrl?: string;
}

export const PasswordChangedEmail: React.FC<PasswordChangedEmailProps> = ({
  name = 'Valued Client',
  loginUrl = 'https://chimjoylogistics.com.ng/auth/login',
}) => {
  return (
    <EmailLayout
      previewText="Your ChimJoy account password has been updated"
      badge="SECURITY CONFIRMATION"
      title="Password Changed Successfully"
    >
      <Text style={textStyle}>Hello <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        This is confirmation that the password for your ChimJoy Logistics account has been successfully updated.
      </Text>

      <EmailButton href={loginUrl} variant="navy">
        Sign In with New Password
      </EmailButton>

      <Text style={footerTextStyle}>
        If you did not make this change, please contact our 24/7 concierge support immediately at <strong>+234 807 788 0262</strong>.
      </Text>
    </EmailLayout>
  );
};

const textStyle: React.CSSProperties = {
  color: '#334155',
  fontSize: '14px',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
};

const footerTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  margin: '24px 0 0 0',
  textAlign: 'center',
};

export default PasswordChangedEmail;
