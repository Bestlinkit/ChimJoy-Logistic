import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailCard } from '../components/EmailCard';
import { EmailButton } from '../components/EmailButton';

interface BookingConfirmedEmailProps {
  name?: string;
  refCode?: string;
  vehicleName?: string;
  pickupLocation?: string;
  pickupDate?: string;
  driverName?: string;
  driverPhone?: string;
  totalPrice?: number;
  bookingUrl?: string;
}

export const BookingConfirmedEmail: React.FC<BookingConfirmedEmailProps> = ({
  name = 'Valued Client',
  refCode = 'CJ-8849',
  vehicleName = 'Toyota Land Cruiser Prado TX-L',
  pickupLocation = 'Sam Mbakwe Airport (QOW) Arrival Terminal',
  pickupDate = 'Tomorrow at 10:30 AM',
  driverName = 'Chinedu Okonkwo',
  driverPhone = '+234 807 788 0262',
  totalPrice = 45000,
  bookingUrl = 'https://chimjoylogistics.com.ng/account/bookings/CJ-8849',
}) => {
  return (
    <EmailLayout
      previewText={`Booking Confirmed! Ref #${refCode} — ChimJoy Logistics`}
      badge="BOOKING CONFIRMED"
      title="Your Booking is Confirmed"
    >
      <Text style={textStyle}>Dear <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        Great news! Your booking with ChimJoy Logistics Services Ltd has been officially confirmed and dispatched.
      </Text>

      <EmailCard>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Reference:</td>
              <td style={valStyle}>#{refCode}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Vehicle:</td>
              <td style={valStyle}>{vehicleName}</td>
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
              <td style={labelStyle}>Assigned Driver:</td>
              <td style={valStyle}>{driverName} ({driverPhone})</td>
            </tr>
            <tr>
              <td style={labelStyle}>Total Fare:</td>
              <td style={priceValStyle}>₦{totalPrice.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </EmailCard>

      <EmailButton href={bookingUrl} variant="lemon">
        View Booking Receipt
      </EmailButton>

      <Text style={footerTextStyle}>
        Your chauffeur will arrive at the designated pickup location prior to your pickup time.
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

export default BookingConfirmedEmail;
