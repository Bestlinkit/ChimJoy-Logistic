import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailButton } from '../components/EmailButton';

interface ForgotPasswordEmailProps {
  name?: string;
  resetUrl?: string;
}

export const ForgotPasswordEmail: React.FC<ForgotPasswordEmailProps> = ({
  name = 'Valued Client',
  resetUrl = 'https://chimjoylogistics.com.ng/auth/reset-password',
}) => {
  return (
    <EmailLayout
      previewText="Reset your ChimJoy account password"
      badge="PASSWORD RESET"
      title="Reset Your Password"
    >
      <Text style={textStyle}>Hello <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        We received a request to reset your password for your ChimJoy Logistics account. Click the button below to choose a new password:
      </Text>

      <EmailButton href={resetUrl} variant="lemon">
        Reset Password Now
      </EmailButton>

      <Text style={noticeStyle}>
        ⌛ This link will expire in <strong>15 minutes</strong> for security reasons.
      </Text>

      <Text style={footerTextStyle}>
        If you did not request a password reset, you can safely ignore this email. Your current password remains unchanged.
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

const noticeStyle: React.CSSProperties = {
  color: '#0B192C',
  fontSize: '13px',
  fontWeight: 700,
  textAlign: 'center',
  margin: '16px 0',
};

const footerTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  margin: '24px 0 0 0',
  textAlign: 'center',
};

export default ForgotPasswordEmail;
