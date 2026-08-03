import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailOtpBox } from '../components/EmailOtpBox';
import { EmailButton } from '../components/EmailButton';

interface LoginVerificationEmailProps {
  name?: string;
  code?: string;
  device?: string;
  verifyUrl?: string;
}

export const LoginVerificationEmail: React.FC<LoginVerificationEmailProps> = ({
  name = 'Valued Client',
  code = '884920',
  device = 'New Browser / Mobile Device',
  verifyUrl = 'https://chimjoylogistics.com.ng/auth/verify-login',
}) => {
  return (
    <EmailLayout
      previewText={`Login verification code: ${code} - ChimJoy Account`}
      badge="NEW DEVICE DETECTED"
      title="Authorize Sign In"
    >
      <Text style={textStyle}>Hello <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        We detected a sign-in attempt to your ChimJoy account from <strong>{device}</strong>. Enter the OTP code below to authorize this session:
      </Text>

      <EmailOtpBox code={code} expiryMinutes={5} />

      <EmailButton href={`${verifyUrl}?code=${code}`} variant="lemon">
        Authorize Sign In
      </EmailButton>

      <Text style={footerTextStyle}>
        If this wasn’t you, please reset your password immediately to protect your account.
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

export default LoginVerificationEmail;
