const verifymailTemplate = (otp, name) => {
  return `
    <body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:6px; overflow:hidden;">
            
            <!-- Header -->
            <tr>
              <td style="background-color:#2563eb; padding:20px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:24px;">
                  Email Verification
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:30px; color:#333333;">
                <p style="font-size:16px; margin:0 0 16px;">
                  Hi <strong>${name}</strong>,
                </p>

                <p style="font-size:15px; line-height:1.6; margin:0 0 20px;">
                  Use the following One-Time Password (OTP) to verify your email address.
                </p>

                <!-- OTP Box -->
                <div style="text-align:center; margin:30px 0;">
                  <span
                    style="
                      display:inline-block;
                      background-color:#f1f5f9;
                      color:#111827;
                      font-size:28px;
                      letter-spacing:6px;
                      padding:14px 24px;
                      border-radius:6px;
                      font-weight:bold;
                    "
                  >
                    ${otp}
                  </span>
                </div>

                <p style="font-size:14px; color:#555555; text-align:center;">
                  This OTP is valid for <strong>{{expiry}}</strong> minutes.
                </p>

                <p style="font-size:14px; color:#555555; margin-top:30px;">
                  If you did not request this, please ignore this email or contact support.
                </p>

                <p style="font-size:14px; margin-top:30px;">
                  Regards,<br />
                  <strong>Your App Team</strong>
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color:#f4f6f8; padding:15px; text-align:center; font-size:12px; color:#777777;">
                © {{year}} Your App. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
    `;
};


module.exports = { verifymailTemplate };