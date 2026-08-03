import { BookingRequest } from '@/types';
import { formatCurrency } from '@/lib/utils';

export function downloadReceiptPdf(booking: BookingRequest) {
  // Generate itemized receipt HTML and open browser print window for instant PDF save
  const printWindow = window.open('', '_blank');
  if (!printWindow) return;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Receipt_${booking.referenceCode}</title>
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #0E1726; max-width: 800px; margin: 0 auto; }
        .header { display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #0B192C; padding-bottom: 20px; margin-bottom: 30px; }
        .company-name { font-size: 24px; font-weight: 900; color: #0B192C; }
        .receipt-title { font-size: 14px; font-weight: 900; color: #9BC800; text-transform: uppercase; background: #0B192C; padding: 6px 16px; border-radius: 20px; }
        .meta-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px; }
        .meta-box { background: #F4F6F9; p: 16px; padding: 16px; border-radius: 12px; font-size: 12px; }
        .meta-label { font-weight: bold; color: #003366; text-transform: uppercase; margin-bottom: 4px; font-size: 10px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 13px; }
        th { background: #0B192C; color: #ffffff; text-align: left; padding: 12px; font-size: 11px; text-transform: uppercase; }
        td { padding: 12px; border-bottom: 1px solid #E2E8F0; }
        .total-row { font-weight: 900; font-size: 16px; color: #0B192C; background: #F4F6F9; }
        .footer { text-align: center; font-size: 11px; color: #64748B; margin-top: 50px; border-top: 1px solid #E2E8F0; padding-top: 20px; }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="company-name">CHIMJOY LOGISTICS SERVICES LTD</div>
          <div style="font-size: 12px; color: #64748B;">56 Christ Church Road, Owerri, Imo State, Nigeria</div>
        </div>
        <div class="receipt-title">OFFICIAL RECEIPT</div>
      </div>

      <div class="meta-grid">
        <div class="meta-box">
          <div class="meta-label">Customer Information</div>
          <div style="font-weight: bold;">${booking.customerName}</div>
          <div>Phone: ${booking.customerPhone}</div>
          <div>Email: ${booking.customerEmail || 'N/A'}</div>
        </div>
        <div class="meta-box">
          <div class="meta-label">Booking Details</div>
          <div>Booking Ref: <strong>${booking.referenceCode}</strong></div>
          <div>Date: ${booking.pickupDate} @ ${booking.pickupTime}</div>
          <div>Status: <span style="color:#003366; font-weight:bold;">${booking.status}</span></div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Route / Details</th>
            <th style="text-align: right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>${booking.vehicleName}</strong><br/>
              <span style="font-size: 11px; color: #64748B;">Service: ${booking.serviceType}</span>
            </td>
            <td>
              From: ${booking.pickupLocation}<br/>
              To: ${booking.dropoffLocation}
            </td>
            <td style="text-align: right; font-weight: bold;">
              ${formatCurrency(booking.estimatedPrice)}
            </td>
          </tr>
          ${booking.assignedDriver ? `
          <tr>
            <td colspan="2">Assigned Chauffeur: <strong>${booking.assignedDriver}</strong> (${booking.assignedVehicleNo || 'Verified Vehicle'})</td>
            <td style="text-align: right;">Included</td>
          </tr>
          ` : ''}
          <tr class="total-row">
            <td colspan="2" style="text-align: right; padding-right: 20px;">TOTAL PAID / DUE</td>
            <td style="text-align: right;">${formatCurrency(booking.estimatedPrice)}</td>
          </tr>
        </tbody>
      </table>

      <div class="footer">
        <p>Thank you for traveling with ChimJoy Logistics Services Ltd.</p>
        <p>24/7 Operations Hotline: +234 807 788 0262 | hq@chimjoylogistics.com.ng</p>
      </div>

      <script>
        window.onload = function() {
          window.print();
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.write(html);
  printWindow.document.close();
}
