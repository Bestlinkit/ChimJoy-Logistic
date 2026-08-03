import React from 'react';
import { Text } from '@react-email/components';
import { EmailLayout } from '../components/EmailLayout';
import { EmailCard } from '../components/EmailCard';

interface ContactFormNotificationEmailProps {
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  subject?: string;
  message?: string;
}

export const ContactFormNotificationEmail: React.FC<ContactFormNotificationEmailProps> = ({
  senderName = 'Chinedu Okonkwo',
  senderEmail = 'chinedu@company.ng',
  senderPhone = '+234 803 000 0000',
  subject = 'Corporate Fleet Hire Inquiry',
  message = 'We require 3 SUV Land Cruiser Prados for an executive convoy from Owerri to Enugu for a 3-day corporate conference.',
}) => {
  return (
    <EmailLayout
      previewText={`New Inquiry from ${senderName}: ${subject}`}
      badge="WEBSITE ENQUIRY"
      title="New Contact Form Message"
    >
      <Text style={textStyle}>
        A new inquiry has been submitted via the ChimJoy website contact form:
      </Text>

      <EmailCard>
        <table style={tableStyle}>
          <tbody>
            <tr>
              <td style={labelStyle}>Sender Name:</td>
              <td style={valStyle}>{senderName}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Sender Email:</td>
              <td style={valStyle}>{senderEmail}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Phone Number:</td>
              <td style={valStyle}>{senderPhone}</td>
            </tr>
            <tr>
              <td style={labelStyle}>Subject:</td>
              <td style={valStyle}>{subject}</td>
            </tr>
          </tbody>
        </table>

        <div style={messageBoxStyle}>
          <Text style={messageHeadingStyle}>Enquiry Message:</Text>
          <Text style={messageContentStyle}>{message}</Text>
        </div>
      </EmailCard>

      <Text style={footerTextStyle}>
        Log into the ChimJoy Admin Portal to respond to this lead or reply directly to {senderEmail}.
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
  padding: '6px 0',
  color: '#64748B',
  fontWeight: 600,
};

const valStyle: React.CSSProperties = {
  padding: '6px 0',
  color: '#0B192C',
  fontWeight: 800,
  textAlign: 'right',
};

const messageBoxStyle: React.CSSProperties = {
  backgroundColor: '#FFFFFF',
  padding: '14px 16px',
  borderRadius: '12px',
  border: '1px solid #CBD5E1',
  marginTop: '16px',
};

const messageHeadingStyle: React.CSSProperties = {
  color: '#0B192C',
  fontSize: '12px',
  fontWeight: 800,
  margin: '0 0 6px 0',
  textTransform: 'uppercase',
};

const messageContentStyle: React.CSSProperties = {
  color: '#334155',
  fontSize: '13px',
  margin: '0',
  whiteSpace: 'pre-line',
};

const footerTextStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '12px',
  margin: '24px 0 0 0',
  textAlign: 'center',
};

export default ContactFormNotificationEmail;
