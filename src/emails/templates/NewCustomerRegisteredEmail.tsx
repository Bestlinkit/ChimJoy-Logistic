import * as React from 'react';
import { EmailLayout } from '../components/EmailLayout';
import { EmailButton } from '../components/EmailButton';

interface NewCustomerRegisteredProps {
  customerName: string;
  customerEmail: string;
  registeredAt: string;
}

export const NewCustomerRegisteredEmail: React.FC<NewCustomerRegisteredProps> = ({
  customerName = 'Jane Doe',
  customerEmail = 'jane@example.com',
  registeredAt = new Date().toISOString(),
}) => {
  return (
    <EmailLayout title="👤 New Customer Registration Alert" previewText={`New Customer Registered: ${customerName}`}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0B192C', margin: '0 0 16px 0' }}>
        New Customer Account Created!
      </h1>
      <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', margin: '0 0 16px 0' }}>
        A new user account has been registered on ChimJoy Logistics platform.
      </p>

      <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #E2E8F0' }}>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Name:</strong> {customerName}
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Email:</strong> {customerEmail}
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Registered Date:</strong> {new Date(registeredAt).toLocaleString()}
        </p>
      </div>

      <EmailButton href="https://chimjoylogistics.com.ng/admin/customers" variant="navy">
        View Customer Registry
      </EmailButton>
    </EmailLayout>
  );
};

export default NewCustomerRegisteredEmail;
