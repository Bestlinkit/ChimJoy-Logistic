import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailButton } from '../components/EmailButton';

interface NewsletterSubscriptionEmailProps {
  email?: string;
  browseFleetUrl?: string;
}

export const NewsletterSubscriptionEmail: React.FC<NewsletterSubscriptionEmailProps> = ({
  email = 'subscriber@company.ng',
  browseFleetUrl = 'https://chimjoylogistics.com.ng/fleet',
}) => {
  return (
    <EmailLayout
      previewText="Welcome to the ChimJoy Executive Insider Newsletter"
      badge="SUBSCRIBED"
      title="Welcome to ChimJoy Insiders"
    >
      <Text style={textStyle}>Hello,</Text>
      <Text style={textStyle}>
        Thank you for subscribing to the ChimJoy Logistics newsletter with <strong>{email}</strong>.
      </Text>
      <Text style={textStyle}>
        You will now receive exclusive updates on our vehicle fleet additions, special airport transfer discounts, holiday car hire packages, and mobility travel insights across Southeast Nigeria.
      </Text>

      <EmailButton href={browseFleetUrl} variant="lemon">
        Explore Our Luxury Fleet
      </EmailButton>

      <Text style={footerTextStyle}>
        You can update your communication preferences at any time in your account dashboard.
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

export default NewsletterSubscriptionEmail;
