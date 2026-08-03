import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailCard } from '../components/EmailCard';
import { EmailButton } from '../components/EmailButton';

interface DriverArrivedEmailProps {
  name?: string;
  driverName?: string;
  driverPhone?: string;
  vehicleDetails?: string;
  plateNumber?: string;
  pickupLocation?: string;
  whatsAppUrl?: string;
}

export const DriverArrivedEmail: React.FC<DriverArrivedEmailProps> = ({
  name = 'Valued Client',
  driverName = 'Chinedu Okonkwo',
  driverPhone = '+234 807 788 0262',
  vehicleDetails = 'Toyota Land Cruiser Prado TX-L',
  plateNumber = 'WER-842-AA',
  pickupLocation = 'Sam Mbakwe Airport Arrival Gate',
  whatsAppUrl = 'https://wa.me/2348077880262',
}) => {
  return (
    <EmailLayout
      previewText={`Your driver ${driverName} has arrived at ${pickupLocation}`}
      badge="DRIVER HAS ARRIVED"
      title="Your Chchauffeur Has Arrived"
    >
      <Text style={textStyle}>Hello <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        Your executive chauffeur <strong>{driverName}</strong> has arrived at the designated pickup location and is ready for your departure.
      </Text>

      <EmailCard style={{ backgroundColor: '#0B192C', color: '#FFFFFF', border: '2px solid #9BC800' }}>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={darkLabelStyle}>Location:</td>
              <td style={darkValStyle}>{pickupLocation}</td>
            </tr>
            <tr>
              <td style={darkLabelStyle}>Chchauffeur:</td>
              <td style={darkValStyle}>{driverName}</td>
            </tr>
            <tr>
              <td style={darkLabelStyle}>Phone:</td>
              <td style={darkValStyle}>{driverPhone}</td>
            </tr>
            <tr>
              <td style={darkLabelStyle}>Vehicle:</td>
              <td style={darkValStyle}>{vehicleDetails}</td>
            </tr>
            <tr>
              <td style={darkLabelStyle}>Plate Number:</td>
              <td style={plateValStyle}>{plateNumber}</td>
            </tr>
          </tbody>
        </table>
      </EmailCard>

      <EmailButton href={whatsAppUrl} variant="lemon">
        Open WhatsApp Chat with Driver
      </EmailButton>

      <Text style={footerTextStyle}>
        Your driver is standing by with a name sign. Please meet at the designated pickup point.
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

const darkLabelStyle: React.CSSProperties = {
  padding: '8px 0',
  color: '#94A3B8',
  fontWeight: 600,
};

const darkValStyle: React.CSSProperties = {
  padding: '8px 0',
  color: '#FFFFFF',
  fontWeight: 800,
  textAlign: 'right',
};

const plateValStyle: React.CSSProperties = {
  padding: '8px 0',
  color: '#9BC800',
  fontWeight: 900,
  fontSize: '14px',
  textAlign: 'right',
};

const footerTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  margin: '24px 0 0 0',
  textAlign: 'center',
};

export default DriverArrivedEmail;
