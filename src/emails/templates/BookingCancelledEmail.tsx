import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailCard } from '../components/EmailCard';
import { EmailButton } from '../components/EmailButton';

interface BookingCancelledEmailProps {
  name?: string;
  refCode?: string;
  reason?: string;
  bookAgainUrl?: string;
}

export const BookingCancelledEmail: React.FC<BookingCancelledEmailProps> = ({
  name = 'Valued Client',
  refCode = 'CJ-8849',
  reason = 'Cancelled by client request',
  bookAgainUrl = 'https://chimjoylogistics.com.ng/book/ride',
}) => {
  return (
    <EmailLayout
      previewText={`Booking Cancelled Confirmation — Ref #${refCode}`}
      badge="BOOKING CANCELLED"
      title="Booking Cancellation Confirmation"
    >
      <Text style={textStyle}>Dear <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        This email confirms that your booking request <strong>#{refCode}</strong> has been cancelled.
      </Text>

      <EmailCard>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Booking Reference:</td>
              <td style={valStyle}>#{refCode}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Status:</td>
              <td style={statusValStyle}>Cancelled</td>
            </tr>
            <tr>
              <td style={labelStyle}>Reason:</td>
              <td style={valStyle}>{reason}</td>
            </tr>
          </tbody>
        </table>
      </EmailCard>

      <EmailButton href={bookAgainUrl} variant="lemon">
        Book Another Ride
      </EmailButton>

      <Text style={footerTextStyle}>
        If you believe this cancellation was done in error or need assistance, please contact our 24/7 hotline at <strong>+234 807 788 0262</strong>.
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

const tableStyle: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13px',
};

const labelStyle: React.CSSProperties = {
  padding: '8px 0',
  color: '#64748B',
  fontWeight: 600,
};

const valStyle: React.CSSProperties = {
  padding: '8px 0',
  color: '#0B192C',
  fontWeight: 800,
  textAlign: 'right',
};

const statusValStyle: React.CSSProperties = {
  padding: '8px 0',
  color: '#991B1B',
  fontWeight: 900,
  textAlign: 'right',
};

const footerTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  margin: '24px 0 0 0',
  textAlign: 'center',
};

export default BookingCancelledEmail;
