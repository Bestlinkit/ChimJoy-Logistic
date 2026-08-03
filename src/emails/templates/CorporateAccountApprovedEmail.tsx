import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailCard } from '../components/EmailCard';
import { EmailButton } from '../components/EmailButton';

interface CorporateAccountApprovedEmailProps {
  companyName?: string;
  contactName?: string;
  accountManagerName?: string;
  dashboardUrl?: string;
}

export const CorporateAccountApprovedEmail: React.FC<CorporateAccountApprovedEmailProps> = ({
  companyName = 'Apex Global Enterprises',
  contactName = 'Chinedu Okonkwo',
  accountManagerName = 'ChimJoy Corporate Services Division',
  dashboardUrl = 'https://chimjoylogistics.com.ng/account',
}) => {
  return (
    <EmailLayout
      previewText={`Corporate Account Approved for ${companyName} — ChimJoy Logistics`}
      badge="CORPORATE APPROVED"
      title="Corporate Account Approved"
    >
      <Text style={textStyle}>Dear <strong>{contactName}</strong>,</Text>
      <Text style={textStyle}>
        We are pleased to inform you that the corporate transport account for <strong>{companyName}</strong> has been officially reviewed and approved by ChimJoy Logistics Services Ltd.
      </Text>

      <EmailCard style={{ backgroundColor: '#0B192C', color: '#FFFFFF', border: '2px solid #9BC800' }}>
        <Text style={cardHeadingStyle}>Corporate Client Benefits Enabled:</Text>
        <ul style={listStyle}>
          <li>Priority dispatch for executive airport pickups and fleet rentals.</li>
          <li>Monthly itemized invoicing & custom billing terms.</li>
          <li>Dedicated Account Manager ({accountManagerName}).</li>
          <li>Armed security MOPOL escort dispatch options upon request.</li>
        </ul>
      </EmailCard>

      <EmailButton href={dashboardUrl} variant="lemon">
        Access Corporate Dashboard
      </EmailButton>

      <Text style={footerTextStyle}>
        Welcome to ChimJoy Corporate Mobility. We look forward to serving your organization with distinction.
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
  color: '#9BC800',
  fontSize: '14px',
  fontWeight: 900,
  margin: '0 0 10px 0',
};

const listStyle: React.CSSProperties = {
  color: '#E2E8F0',
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

export default CorporateAccountApprovedEmail;
