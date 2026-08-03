import React from 'react';
import { Section, Text, Link } from '@react-email/components';

export const EmailFooter: React.FC = () => {
  return (
    <Section style={footerSectionStyle}>
      <Text style={companyTitleStyle}>ChimJoy Logistics Services Ltd</Text>
      <Text style={addressStyle}>
        56 Christ Church Road, Owerri, Imo State, Nigeria
      </Text>

      <Text style={contactStyle}>
        Concierge Hotline: <Link href="tel:+2348077880262" style={linkStyle}>+234 807 788 0262</Link> | Email: <Link href="mailto:hq@chimjoylogistics.com.ng" style={linkStyle}>HQ@CHIMJOYLOGISTICS.COM.NG</Link>
      </Text>

      <div style={dividerStyle} />

      <Text style={copyrightStyle}>
        © 2026 ChimJoy Logistics Services Ltd. All Rights Reserved. Executive Transport & Mobility Solutions.
      </Text>
    </Section>
  );
};

const footerSectionStyle: React.CSSProperties = {
  backgroundColor: '#0B192C',
  padding: '28px 24px',
  textAlign: 'center',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
};

const companyTitleStyle: React.CSSProperties = {
  color: '#FFFFFF',
  fontSize: '13px',
  fontWeight: 800,
  margin: '0 0 4px 0',
  letterSpacing: '0.5px',
};

const addressStyle: React.CSSProperties = {
  color: '#94A3B8',
  fontSize: '11px',
  fontWeight: 500,
  margin: '0 0 10px 0',
};

const contactStyle: React.CSSProperties = {
  color: '#CBD5E1',
  fontSize: '11px',
  fontWeight: 600,
  margin: '0 0 16px 0',
};

const linkStyle: React.CSSProperties = {
  color: '#9BC800',
  textDecoration: 'none',
  fontWeight: 700,
};

const dividerStyle: React.CSSProperties = {
  height: '1px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  margin: '12px auto',
  maxWidth: '240px',
};

const copyrightStyle: React.CSSProperties = {
  color: '#64748B',
  fontSize: '10px',
  fontWeight: 500,
  margin: '0',
};
