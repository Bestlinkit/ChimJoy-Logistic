import * as React from 'react';
import { EmailLayout } from '../components/EmailLayout';
import { EmailButton } from '../components/EmailButton';

interface InvoiceEmailProps {
  customerName: string;
  refCode: string;
  invoiceDate: string;
  dueDate: string;
  serviceDescription: string;
  amount: number;
}

export const InvoiceEmail: React.FC<InvoiceEmailProps> = ({
  customerName = 'Valued Client',
  refCode = 'INV-9021',
  invoiceDate = '2026-08-05',
  dueDate = '2026-08-12',
  serviceDescription = 'Executive Car Hire & Chauffeur Services',
  amount = 120000,
}) => {
  return (
    <EmailLayout title={`Official Invoice [Ref #${refCode}]`} previewText={`Invoice for ${serviceDescription}`}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0B192C', margin: '0 0 16px 0' }}>
        Official Corporate Invoice
      </h1>
      <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', margin: '0 0 16px 0' }}>
        Dear {customerName}, please find your official invoice details below for mobility services provided by ChimJoy Logistics Ltd.
      </p>

      <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #E2E8F0' }}>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Invoice Ref:</strong> #{refCode}
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Issue Date:</strong> {invoiceDate}
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Payment Due:</strong> {dueDate}
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Service:</strong> {serviceDescription}
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#0B192C', fontWeight: 'bold' }}>
          Total Due: ₦{amount.toLocaleString()}
        </p>
      </div>

      <EmailButton href="https://chimjoylogistics.com.ng/account/bookings" variant="navy">
        View & Pay Invoice in Account
      </EmailButton>
    </EmailLayout>
  );
};

export default InvoiceEmail;
