import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailButton } from '../components/EmailButton';
import { EmailCard } from '../components/EmailCard';

interface WelcomeEmailProps {
  name?: string;
  loginUrl?: string;
}

export const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  name = 'Valued Client',
  loginUrl = 'https://chimjoylogistics.com.ng/auth/login',
}) => {
  return (
    <EmailLayout
      previewText="Welcome to ChimJoy Logistics — Executive Mobility & Car Hire in Owerri"
      badge="ACCOUNT CREATED"
      title="Welcome to ChimJoy Logistics"
    >
      <Text style={textStyle}>Hello <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        Thank you for creating your account with ChimJoy Logistics Services Ltd. We are delighted to welcome you to Nigeria’s premier mobility network.
      </Text>

      <EmailCard>
        <Text style={cardTitleStyle}>What You Can Do With Your Account:</Text>
        <ul style={listStyle}>
          <li>Book executive rides and Sam Mbakwe airport transfers in seconds.</li>
          <li>Hire SUV, Sedan, or Executive Bus fleets with vetted chauffeurs.</li>
          <li>Save pickup locations and track live flight statuses.</li>
          <li>Generate itemized PDF receipts and manage corporate invoices.</li>
        </ul>
      </EmailCard>

      <EmailButton href={loginUrl} variant="lemon">
        Sign In to Your Account
      </EmailButton>

      <Text style={footerTextStyle}>
        If you have any questions or need assistance planning a journey, our concierge control team is available 24/7.
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

const cardTitleStyle: React.CSSProperties = {
  color: '#0B192C',
  fontSize: '14px',
  fontWeight: 800,
  margin: '0 0 8px 0',
};

const listStyle: React.CSSProperties = {
  color: '#475569',
  fontSize: '13px',
  lineHeight: '1.8',
  margin: '0',
  paddingLeft: '20px',
};

const footerTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  margin: '24px 0 0 0',
  textAlign: 'center',
};

export default WelcomeEmail;
