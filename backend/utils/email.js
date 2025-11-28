import nodemailer from 'nodemailer';

// Create transporter from env vars (safer than hardcoded credentials)
const Transporter = nodemailer.createTransport({
    service: 'gmail',
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true' || false,
    auth: {
        user: process.env.USER_EMAIL || process.env.SMTP_USER,
        pass: process.env.USER_PASSWORD || process.env.SMTP_PASS,
    },
});

export const sendEmail = async (options) => {
    try {
        const mailOptions = {
            from: {
                address: options.senderEmail || process.env.USER_EMAIL,
                name: options.senderName || process.env.USER_NAME || 'Algeria 2.0'
            },
            to: options.email || process.env.USER_EMAIL,
            cc: options.cc || '',
            subject: options.subject,
            text: options.message,
            html: options.html || undefined
        };

        const info = await Transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return { success: true, message: 'Email sent successfully', messageId: info.messageId };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, message: 'Email send failed', error: error.message };
    }
};

export default { sendEmail };