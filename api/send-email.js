import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message, phone} = req.body;

    // Configure your email transport for Gmail
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.GMAIL_USERNAME, // Use environment variable for your Gmail address
        pass: process.env.GMAIL_PASSWORD, // Use environment variable for your Gmail app password
      },
    });

    const mailOptions = {
      from: email,
      to: 'matt.rusel@protonmail.com',
      subject: `Form submitted on Play from ${name}`,
      text: `Message: ${message}\nEmail: ${email}\nPhone: ${phone}`,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error sending email:', error); // Log the error
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}