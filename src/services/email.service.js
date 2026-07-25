const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    // type: "OAuth2",
    // user: process.env.EMAIL_USER,
    // clientId: process.env.CLIENT_ID,
    // clientSecret: process.env.CLIENT_SECRET,
    // refreshToken: process.env.REFRESH_TOKEN,
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"VaultPay" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
  const subject = "Welcome to VaultPay";

  const text = `Hello ${name},

Thank you for registering at VaultPay. We're excited to have you on board!

Best regards,
The VaultPay Team`;

  const html = `
    <p>Hello ${name},</p>
    <p>Thank you for registering at <b>VaultPay</b>. We're excited to have you on board!</p>
    <p>Best regards,<br>The VaultPay Team</p>
  `;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Successful!";

  const text = `Hello ${name},

Your transaction has been completed successfully.

Transaction Details:
- Amount: $${amount}
- Recipient Account: ${toAccount}
- Status: SUCCESSFUL

The amount has been transferred successfully.

Thank you for choosing VaultPay.

Best Regards,
The VaultPay Team`;

  await sendEmail(userEmail, subject, text, html);
}

async function sendTransactionFailureEmail(userEmail, name, amount, toAccount) {
  const subject = "Transaction Failed";

  const text = `Hello ${name},

We regret to inform you that your transaction could not be completed.

Transaction Details:
- Amount: $${amount}
- Recipient Account: ${toAccount}
- Status: FAILED

No amount has been deducted from your account.

If you did not initiate this transaction or continue to experience issues, please contact our support team.

Thank you for choosing VaultPay.

Best Regards,
The VaultPay Team`;

  await sendEmail(userEmail, subject, text, html);
}
module.exports = {
  sendRegistrationEmail,
  sendTransactionEmail,
  sendTransactionFailureEmail
};
