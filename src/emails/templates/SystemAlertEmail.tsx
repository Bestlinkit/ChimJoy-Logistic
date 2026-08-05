import * as React from 'react';
import { EmailLayout } from '../components/EmailLayout';
import { EmailButton } from '../components/EmailButton';

interface SystemAlertProps {
  alertTitle: string;
  alertSeverity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  alertMessage: string;
  timestamp: string;
}

export const SystemAlertEmail: React.FC<SystemAlertProps> = ({
  alertTitle = 'System Event Alert',
  alertSeverity = 'HIGH',
  alertMessage = 'An operational system event requires administrator attention.',
  timestamp = new Date().toISOString(),
}) => {
  const isCritical = alertSeverity === 'CRITICAL' || alertSeverity === 'HIGH';

  return (
    <EmailLayout title={`[SYSTEM ${alertSeverity}] ${alertTitle}`} previewText={alertMessage}>
      <h1 style={{ fontSize: '20px', fontWeight: 'bold', color: isCritical ? '#DC2626' : '#0B192C', margin: '0 0 16px 0' }}>
        System Diagnostic Alert ({alertSeverity})
      </h1>

      <div style={{ backgroundColor: isCritical ? '#FEF2F2' : '#F8FAFC', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: `1px solid ${isCritical ? '#FCA5A5' : '#E2E8F0'}` }}>
        <p style={{ margin: '4px 0', fontSize: '14px', color: '#0E1726', fontWeight: 'bold' }}>
          {alertTitle}
        </p>
        <p style={{ margin: '8px 0', fontSize: '13px', color: '#334155', lineHeight: '1.5' }}>
          {alertMessage}
        </p>
        <p style={{ margin: '8px 0 0 0', fontSize: '11px', color: '#64748B' }}>
          Time: {new Date(timestamp).toLocaleString()}
        </p>
      </div>

      <EmailButton href="https://chimjoylogistics.com.ng/admin/system" variant="navy">
        Open System Health Diagnostic Console
      </EmailButton>
    </EmailLayout>
  );
};

export default SystemAlertEmail;
