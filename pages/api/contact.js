import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASS,
      },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: process.env.GMAIL_USER,
        replyTo: email,
        subject: `【お問い合わせ】${name}様より`,
        text: `
ウェブサイトからのお問い合わせがありました。

■お名前: ${name}
■メールアドレス: ${email}

■お問い合わせ内容:
${message}
        `,
    };

    try {
      await transporter.sendMail(mailOptions);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}