import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailCard } from '../components/EmailCard';
import { EmailButton } from '../components/EmailButton';

interface TripReminderEmailProps {
  name?: string;
  refCode?: string;
  pickupLocation?: string;
  pickupTime?: string;
  driverName?: string;
  driverPhone?: string;
  supportUrl?: string;
}

export const TripReminderEmail: React.FC<TripReminderEmailProps> = ({
  name = 'Valued Client',
  refCode = 'CJ-8849',
  pickupLocation = 'Sam Mbakwe International Cargo Airport (QOW)',
  pickupTime = 'In 2 Hours (10:30 AM)',
  driverName = 'Chinedu Okonkwo',
  driverPhone = '+234 807 788 0262',
  supportUrl = 'https://chimjoylogistics.com.ng/contact',
}) => {
  return (
    <EmailLayout
      previewText={`Trip Reminder: Pickup at ${pickupTime} — Ref #${refCode}`}
      badge="UPCOMING TRIP REMINDER"
      title="Your Trip is Coming Up"
    >
      <Text style={textStyle}>Dear <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        This is a friendly reminder that your upcoming ride with ChimJoy Logistics is scheduled for <strong>{pickupTime}</strong>.
      </Text>

      <EmailCard>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Booking Ref:</td>
              <td style={valStyle}>#{refCode}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Pickup Location:</td>
              <td style={valStyle}>{pickupLocation}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Scheduled Time:</td>
              <td style={timeValStyle}>{pickupTime}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Assigned Chchauffeur:</td>
              <td style={valStyle}>{driverName} ({driverPhone})</td>
            </tr>
          </tbody>
        </table>
      </EmailCard>

      <EmailButton href={supportUrl} variant="navy">
        Contact Support / Modify Request
      </EmailButton>

      <Text style={footerTextStyle}>
        Your chauffeur will be waiting at the pickup spot prior to your scheduled time.
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

const timeValStyle: React.CSSProperties = {
  padding: '8px 0',
  color: '#003366',
  fontWeight: 900,
  textAlign: 'right',
};

const footerTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  margin: '24px 0 0 0',
  textAlign: 'center',
};

export default TripReminderEmail;
