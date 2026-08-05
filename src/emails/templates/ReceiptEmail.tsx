import * as React from 'react';
import { EmailLayout } from '../components/EmailLayout';
import { EmailButton } from '../components/EmailButton';

interface ReceiptEmailProps {
  customerName: string;
  refCode: string;
  paymentDate: string;
  paymentMethod: string;
  amountPaid: number;
}

export const ReceiptEmail: React.FC<ReceiptEmailProps> = ({
  customerName = 'Valued Client',
  refCode = 'RCT-8841',
  paymentDate = '2026-08-05',
  paymentMethod = 'Bank Transfer / Card',
  amountPaid = 85000,
}) => {
  return (
    <EmailLayout title={`Payment Receipt [Ref #${refCode}]`} previewText={`Payment receipt of ₦${amountPaid.toLocaleString()}`}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0B192C', margin: '0 0 16px 0' }}>
        Official Payment Receipt
      </h1>
      <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', margin: '0 0 16px 0' }}>
        Dear {customerName}, thank you for your payment. This email serves as your official payment receipt from ChimJoy Logistics Ltd.
      </p>

      <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #E2E8F0' }}>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Receipt Number:</strong> #{refCode}
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Payment Date:</strong> {paymentDate}
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Payment Method:</strong> {paymentMethod}
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#9BC800', fontWeight: 'bold' }}>
          Amount Paid: ₦{amountPaid.toLocaleString()}
        </p>
      </div>

      <EmailButton href="https://chimjoylogistics.com.ng/account/history" variant="navy">
        View Transaction History
      </EmailButton>
    </EmailLayout>
  );
};

export default ReceiptEmail;
