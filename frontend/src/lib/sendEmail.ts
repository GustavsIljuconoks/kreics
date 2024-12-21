import { Resend } from 'resend';
import { ContactEmailTemplate } from '@/app/components/ContactEmailTemplate';
import { IFormData } from './definitions';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function sendEmail(formData: IFormData) {
  try {
    await resend.emails.send({
      from: formData.email,
      to: [process.env.ADMIN_EMAIL as string],
      subject: 'Hello world',
      react: ContactEmailTemplate({
        name: formData.name,
        message: formData.message,
        subject: formData.subject,
      }),
    });

    return {
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      success: false,
      message: error.message,
    };
  }
}
