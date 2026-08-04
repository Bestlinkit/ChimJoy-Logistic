import { db } from '../config';
import { collection, addDoc, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { AuditLog, AdminRole } from '@/types/admin';

export async function logAdminAction(
  adminEmail: string,
  adminRole: AdminRole,
  action: string,
  moduleName: string,
  details: string,
  oldValue?: string,
  newValue?: string
): Promise<void> {
  try {
    const auditRef = collection(db, 'audit_logs');
    const newLog: Omit<AuditLog, 'id'> = {
      adminEmail,
      adminRole,
      action,
      module: moduleName,
      details,
      oldValue: oldValue || '',
      newValue: newValue || '',
      ipAddress: typeof window !== 'undefined' ? window.location.hostname : '127.0.0.1',
      timestamp: new Date().toISOString(),
    };
    await addDoc(auditRef, newLog);
  } catch (err) {
    console.error('[Audit Logger Error]:', err);
  }
}

export function subscribeToAuditLogs(limitCount: number = 100, callback: (logs: AuditLog[]) => void) {
  const auditRef = collection(db, 'audit_logs');
  const q = query(auditRef, orderBy('timestamp', 'desc'), limit(limitCount));
  return onSnapshot(q, (snapshot) => {
    const logs: AuditLog[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<AuditLog, 'id'>),
    }));
    callback(logs);
  });
}
