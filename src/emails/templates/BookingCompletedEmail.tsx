import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailCard } from '../components/EmailCard';
import { EmailButton } from '../components/EmailButton';

interface BookingCompletedEmailProps {
  name?: string;
  refCode?: string;
  reviewUrl?: string;
  bookAgainUrl?: string;
}

export const BookingCompletedEmail: React.FC<BookingCompletedEmailProps> = ({
  name = 'Valued Client',
  refCode = 'CJ-8849',
  reviewUrl = 'https://chimjoylogistics.com.ng/contact#review',
  bookAgainUrl = 'https://chimjoylogistics.com.ng/book/ride',
}) => {
  return (
    <EmailLayout
      previewText={`Thank you for traveling with ChimJoy Logistics — Ref #${refCode}`}
      badge="TRIP COMPLETED"
      title="Thank You for Choosing ChimJoy"
    >
      <Text style={textStyle}>Dear <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        Your trip (Ref <strong>#{refCode}</strong>) has been completed. Thank you for choosing ChimJoy Logistics Services Ltd for your executive transportation needs.
      </Text>

      <EmailCard>
        <Text style={cardHeadingStyle}>How was your experience?</Text>
        <Text style={cardBodyStyle}>
          Your feedback helps us continuously deliver world-class chauffeur transport and mobility excellence across Nigeria.
        </Text>

        <EmailButton href={reviewUrl} variant="lemon">
          Leave a Quick Review
        </EmailButton>
      </EmailCard>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <EmailButton href={bookAgainUrl} variant="navy">
          Book Another Ride
        </EmailButton>
      </div>

      <Text style={footerTextStyle}>
        Itemized PDF receipts and trip logs are stored securely in your ChimJoy account dashboard.
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

const cardHeadingStyle: React.CSSProperties = {
  color: '#0B192C',
  fontSize: '15px',
  fontWeight: 800,
  margin: '0 0 8px 0',
  textAlign: 'center',
};

const cardBodyStyle: React.CSSProperties = {
  color: '#475569',
  fontSize: '13px',
  margin: '0 0 16px 0',
  textAlign: 'center',
};

const footerTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  margin: '24px 0 0 0',
  textAlign: 'center',
};

export default BookingCompletedEmail;
