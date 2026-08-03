import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailOtpBox } from '../components/EmailOtpBox';
import { EmailButton } from '../components/EmailButton';

interface VerifyEmailProps {
  name?: string;
  code?: string;
  verifyUrl?: string;
}

export const VerifyEmail: React.FC<VerifyEmailProps> = ({
  name = 'Valued Client',
  code = '884920',
  verifyUrl = 'https://chimjoylogistics.com.ng/auth/verify-email',
}) => {
  return (
    <EmailLayout
      previewText={`Your 6-digit email verification code is ${code}`}
      badge="SECURITY VERIFICATION"
      title="Verify Your Email Address"
    >
      <Text style={textStyle}>Hello <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        Thank you for registering with ChimJoy Logistics Services Ltd. Please enter the 6-digit verification code below to activate your account:
      </Text>

      <EmailOtpBox code={code} expiryMinutes={10} />

      <EmailButton href={`${verifyUrl}?code=${code}`} variant="lemon">
        Verify Email Address
      </EmailButton>

      <Text style={footerTextStyle}>
        If you did not request this verification code, please ignore this email or contact security support immediately.
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

export default VerifyEmail;
