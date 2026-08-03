import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailCard } from '../components/EmailCard';
import { EmailButton } from '../components/EmailButton';

interface BookingReceivedEmailProps {
  name?: string;
  refCode?: string;
  serviceType?: string;
  pickupLocation?: string;
  pickupDate?: string;
  estimatedTotal?: number;
  bookingUrl?: string;
}

export const BookingReceivedEmail: React.FC<BookingReceivedEmailProps> = ({
  name = 'Valued Client',
  refCode = 'CJ-8849',
  serviceType = 'Sam Mbakwe Airport Transfer',
  pickupLocation = 'Sam Mbakwe Airport (QOW) Arrival Terminal',
  pickupDate = 'Tomorrow at 10:30 AM',
  estimatedTotal = 45000,
  bookingUrl = 'https://chimjoylogistics.com.ng/account/bookings/CJ-8849',
}) => {
  return (
    <EmailLayout
      previewText={`Booking Request Received — Ref #${refCode}`}
      badge="REQUEST RECEIVED"
      title="Booking Request Received"
    >
      <Text style={textStyle}>Dear <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        We have received your booking request. Our dispatch control center is currently reviewing driver schedules and availability.
      </Text>

      <EmailCard>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Booking Reference:</td>
              <td style={valStyle}>#{refCode}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Service Requested:</td>
              <td style={valStyle}>{serviceType}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Pickup Location:</td>
              <td style={valStyle}>{pickupLocation}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Date & Time:</td>
              <td style={valStyle}>{pickupDate}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Status:</td>
              <td style={statusValStyle}>Pending Confirmation</td>
            </tr>
            <tr>
              <td style={labelStyle}>Estimated Total:</td>
              <td style={priceValStyle}>₦{estimatedTotal.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </EmailCard>

      <EmailButton href={bookingUrl} variant="lemon">
        View Booking Details
      </EmailButton>

      <Text style={footerTextStyle}>
        You will receive a confirmation email with your assigned chauffeur and vehicle details as soon as confirmation is completed.
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
  color: '#003366',
  fontWeight: 900,
  textAlign: 'right',
};

const priceValStyle: React.CSSProperties = {
  padding: '8px 0',
  color: '#0B192C',
  fontWeight: 900,
  fontSize: '15px',
  textAlign: 'right',
};

const footerTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  margin: '24px 0 0 0',
  textAlign: 'center',
};

export default BookingReceivedEmail;
