import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailCard } from '../components/EmailCard';
import { EmailButton } from '../components/EmailButton';

interface DriverAssignedEmailProps {
  name?: string;
  refCode?: string;
  driverName?: string;
  driverPhone?: string;
  vehicleModel?: string;
  plateNumber?: string;
  pickupTime?: string;
  whatsAppUrl?: string;
}

export const DriverAssignedEmail: React.FC<DriverAssignedEmailProps> = ({
  name = 'Valued Client',
  refCode = 'CJ-8849',
  driverName = 'Chinedu Okonkwo',
  driverPhone = '+234 807 788 0262',
  vehicleModel = 'Toyota Land Cruiser Prado TX-L (Black)',
  plateNumber = 'WER-842-AA',
  pickupTime = 'Today at 10:30 AM',
  whatsAppUrl = 'https://wa.me/2348077880262',
}) => {
  return (
    <EmailLayout
      previewText={`Chauffeur Assigned: ${driverName} (${plateNumber}) — Ref #${refCode}`}
      badge="CHAUFFEUR ASSIGNED"
      title="Your Driver Details"
    >
      <Text style={textStyle}>Dear <strong>{name}</strong>,</Text>
      <Text style={textStyle}>
        A professional executive chauffeur has been assigned to your booking. Here are your driver and vehicle details:
      </Text>

      <EmailCard style={{ backgroundColor: '#0B192C', color: '#FFFFFF', border: '1px solid #9BC800' }}>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={darkLabelStyle}>Chauffeur Name:</td>
              <td style={darkValStyle}>{driverName}</td>
            </tr>
            <tr>
              <td style={darkLabelStyle}>Phone / WhatsApp:</td>
              <td style={darkValStyle}>{driverPhone}</td>
            </tr>
            <tr>
              <td style={darkLabelStyle}>Vehicle Assigned:</td>
              <td style={darkValStyle}>{vehicleModel}</td>
            </tr>
            <tr>
              <td style={darkLabelStyle}>Plate Number:</td>
              <td style={darkBadgeValStyle}>{plateNumber}</td>
            </tr>
            <tr>
              <td style={darkLabelStyle}>Scheduled Pickup:</td>
              <td style={darkValStyle}>{pickupTime}</td>
            </tr>
          </tbody>
        </table>
      </EmailCard>

      <EmailButton href={whatsAppUrl} variant="lemon">
        Contact Driver on WhatsApp
      </EmailButton>

      <Text style={footerTextStyle}>
        Your chauffeur will contact you upon arrival at the pickup point. Have a pleasant journey!
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

const darkBadgeValStyle: React.CSSProperties = {
  padding: '8px 0',
  color: '#9BC800',
  fontWeight: 900,
  textAlign: 'right',
  fontSize: '14px',
  letterSpacing: '1px',
};

const footerTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  margin: '24px 0 0 0',
  textAlign: 'center',
};

export default DriverAssignedEmail;
