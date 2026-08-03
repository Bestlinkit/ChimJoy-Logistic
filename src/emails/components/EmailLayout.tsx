import React from 'react';
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Preview,
} from '@react-email/components';
import { EmailHeader } from './EmailHeader';
import { EmailFooter } from './EmailFooter';

interface EmailLayoutProps {
  previewText: string;
  badge?: string;
  title: string;
  children: React.ReactNode;
}

export const EmailLayout: React.FC<EmailLayoutProps> = ({
  previewText,
  badge,
  title,
  children,
}) => {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={mainStyle}>
        <Container style={containerStyle}>
          {/* Brand Header */}
          <EmailHeader badge={badge} title={title} />
          
          {/* Main Content Card Body */}
          <Section style={contentStyle}>
            {children}
          </Section>

          {/* Brand Footer */}
          <EmailFooter />
        </Container>
      </Body>
    </Html>
  );
};

const mainStyle: React.CSSProperties = {
  backgroundColor: '#F4F6F9',
  fontFamily: '"Plus Jakarta Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  margin: '0 auto',
  padding: '24px 12px',
  color: '#0E1726',
};

const containerStyle: React.CSSProperties = {
  maxWidth: '600px',
  margin: '0 auto',
  backgroundColor: '#FFFFFF',
  borderRadius: '24px',
  overflow: 'hidden',
  border: '1px solid rgba(11, 25, 44, 0.12)',
  boxShadow: '0 20px 40px -15px rgba(11, 25, 44, 0.08)',
};

const contentStyle: React.CSSProperties = {
  padding: '32px 28px',
};
