import * as React from 'react';
import { EmailLayout } from '../components/EmailLayout';
import { EmailButton } from '../components/EmailButton';

interface AdminNewBookingAlertProps {
  refCode: string;
  customerName: string;
  customerPhone: string;
  serviceType: string;
  pickupLocation: string;
  dropoffLocation?: string;
  pickupDate: string;
  estimatedPrice: number;
}

export const AdminNewBookingAlertEmail: React.FC<AdminNewBookingAlertProps> = ({
  refCode = 'CJ-00000',
  customerName = 'Valued Customer',
  customerPhone = '+234 800 000 0000',
  serviceType = 'Car Hire',
  pickupLocation = 'Owerri, Imo State',
  dropoffLocation = 'Port Harcourt',
  pickupDate = '2026-08-10',
  estimatedPrice = 85000,
}) => {
  return (
    <EmailLayout title="🚨 New Booking Request Alert" previewText={`New Booking Request [Ref #${refCode}]`}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0B192C', margin: '0 0 16px 0' }}>
        New Booking Request Received!
      </h1>
      <p style={{ fontSize: '14px', color: '#475569', lineHeight: '1.5', margin: '0 0 16px 0' }}>
        A new booking request has been submitted on the platform and requires administrative review & vehicle allocation.
      </p>

      <div style={{ backgroundColor: '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px solid #E2E8F0' }}>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Reference Code:</strong> #{refCode}
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Customer:</strong> {customerName} ({customerPhone})
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Service Type:</strong> {serviceType}
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Pickup Location:</strong> {pickupLocation}
        </p>
        {dropoffLocation ? (
          <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
            <strong>Destination:</strong> {dropoffLocation}
          </p>
        ) : null}
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#0E1726' }}>
          <strong>Date:</strong> {pickupDate}
        </p>
        <p style={{ margin: '4px 0', fontSize: '13px', color: '#9BC800', fontWeight: 'bold' }}>
          <strong>Est. Rate:</strong> ₦{estimatedPrice.toLocaleString()}
        </p>
      </div>

      <EmailButton href="https://chimjoylogistics.com.ng/admin/bookings" variant="navy">
        Open Operations Dispatch Matrix
      </EmailButton>
    </EmailLayout>
  );
};

export default AdminNewBookingAlertEmail;
