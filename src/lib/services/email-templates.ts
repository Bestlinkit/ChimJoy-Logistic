// ChimJoy Logistics Services Ltd — Official Branded Email Templates

export function getEmailHeader(title: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Helvetica Neue', Arial, sans-serif; background-color: #F4F6F9; color: #0E1726; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 30px auto; bg-color: #ffffff; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(11,25,44,0.08); border: 1px solid #E2E8F0; }
        .header { background-color: #0B192C; padding: 32px 24px; text-align: center; color: #ffffff; }
        .header img { height: 48px; width: auto; margin-bottom: 12px; }
        .header h1 { font-size: 20px; font-weight: 900; margin: 0; color: #ffffff; letter-spacing: -0.5px; }
        .content { padding: 32px 28px; font-size: 14px; line-height: 1.6; color: #475569; }
        .otp-box { background-color: #0B192C; color: #9BC800; font-size: 32px; font-weight: 900; letter-spacing: 8px; text-align: center; padding: 20px; border-radius: 12px; margin: 24px 0; border: 2px border-[#9BC800]; }
        .button { display: inline-block; background-color: #9BC800; color: #0B192C; font-weight: 900; font-size: 14px; text-decoration: none; padding: 14px 28px; border-radius: 30px; margin-top: 16px; text-transform: uppercase; tracking: 1px; }
        .footer { background-color: #F4F6F9; padding: 20px; text-align: center; font-size: 11px; color: #64748B; border-t: 1px solid #E2E8F0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${title}</h1>
        </div>
        <div class="content">
  `;
}

export function getEmailFooter() {
  return `
        </div>
        <div class="footer">
          <p>© 2026 ChimJoy Logistics Services Ltd. 56 Christ Church Road, Owerri, Imo State, Nigeria.</p>
          <p>24/7 Concierge Hotline: +234 807 788 0262 | HQ@CHIMJOYLOGISTICS.COM.NG</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function generateOtpEmailHtml(name: string, code: string) {
  return `
    ${getEmailHeader('Email Verification Code')}
      <p>Hello <strong>${name}</strong>,</p>
      <p>Thank you for choosing ChimJoy Logistics Services Ltd. Please use the verification code below to complete your authentication process:</p>
      <div class="otp-box">${code}</div>
      <p>This code will expire in <strong>10 minutes</strong>. If you did not request this code, please ignore this email.</p>
    ${getEmailFooter()}
  `;
}

export function generateBookingConfirmedEmailHtml(name: string, refCode: string, vehicle: string, pickup: string, date: string, price: number) {
  return `
    ${getEmailHeader(`Booking Confirmed — Ref #${refCode}`)}
      <p>Dear <strong>${name}</strong>,</p>
      <p>Your booking request has been successfully confirmed with ChimJoy Logistics Services Ltd.</p>
      <table style="width:100%; border-collapse:collapse; margin:20px 0; font-size:13px;">
        <tr style="border-bottom:1px solid #E2E8F0;"><td style="padding:8px 0; color:#64748B;">Reference Code:</td><td style="padding:8px 0; font-weight:bold; text-align:right;">${refCode}</td></tr>
        <tr style="border-bottom:1px solid #E2E8F0;"><td style="padding:8px 0; color:#64748B;">Vehicle:</td><td style="padding:8px 0; font-weight:bold; text-align:right;">${vehicle}</td></tr>
        <tr style="border-bottom:1px solid #E2E8F0;"><td style="padding:8px 0; color:#64748B;">Pickup Location:</td><td style="padding:8px 0; font-weight:bold; text-align:right;">${pickup}</td></tr>
        <tr style="border-bottom:1px solid #E2E8F0;"><td style="padding:8px 0; color:#64748B;">Date & Time:</td><td style="padding:8px 0; font-weight:bold; text-align:right;">${date}</td></tr>
        <tr style="border-bottom:1px solid #E2E8F0;"><td style="padding:8px 0; color:#64748B;">Estimated Total:</td><td style="padding:8px 0; font-weight:bold; color:#0B192C; text-align:right;">₦${price.toLocaleString()}</td></tr>
      </table>
      <p>Our dispatch control team will assign a professional chauffeur and send driver details shortly.</p>
    ${getEmailFooter()}
  `;
}
