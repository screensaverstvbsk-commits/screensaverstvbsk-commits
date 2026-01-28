import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, brand, issue } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Name and Phone are required' },
        { status: 400 }
      );
    }

    const businessEmail = 'screensaverstvbsk@gmail.com';
    const emailPass = process.env.EMAIL_PASS;

    // Check for missing password (common cause of failure)
    if (!emailPass) {
      console.error('❌ ERROR: Missing EMAIL_PASS environment variable.');
      return NextResponse.json(
        { error: 'Server configuration error: Missing EMAIL_PASS' },
        { status: 500 }
      );
    }

    // Configure Email Transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || businessEmail, // Use env var or fallback to business email
        pass: emailPass,
      },
    });

    // Verify SMTP connection before attempting to send
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('❌ SMTP Connection Failed:', verifyError);
      
      // Heuristic check for common password mistake (Regular password vs App Password)
      // App passwords are 16 chars long. Regular passwords vary.
      if (emailPass && emailPass.length < 16) {
        console.warn('⚠️  HINT: The provided EMAIL_PASS appears to be a regular login password. Gmail requires an "App Password" (16 characters) if 2-Step Verification is enabled. Please generate one at https://myaccount.google.com/apppasswords');
      }
      
      return NextResponse.json(
        { error: 'Failed to connect to email service. Check server logs for details.' },
        { status: 500 }
      );
    }

    // Email Content
    const mailOptions = {
      from: process.env.EMAIL_USER || businessEmail,
      to: businessEmail, // Send to self
      replyTo: email || undefined, // Allow replying directly to the customer
      subject: `New TV Repair Enquiry - ${name}`,
      text: `
        New TV Repair Enquiry
        -----------------------
        Name: ${name}
        Phone: ${phone}
        Email: ${email || 'Not provided'}
        Brand: ${brand}
        Issue: ${issue}
        
        Location: Bangalore
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
          <h2 style="color: #1e40af;">New TV Repair Enquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="tel:${phone}">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${email || 'Not provided'}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Brand:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${brand}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Issue:</strong></td>
              <td style="padding: 10px; border-bottom: 1px solid #eee;">${issue}</td>
            </tr>
          </table>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">This enquiry was sent from the Screen Savers website.</p>
        </div>
      `,
    };

    // Send Email
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully for enquiry: ${name}`);

    return NextResponse.json({ message: 'Enquiry sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('❌ Failed to send email:', error);
    return NextResponse.json(
      { error: 'Failed to send enquiry' },
      { status: 500 }
    );
  }
}