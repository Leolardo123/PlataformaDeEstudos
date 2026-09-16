import { Injectable } from '@nestjs/common';
import { IEmailProvider } from '../interface/EmailProvider.interface';
import { emailConfig } from 'config/variables';

/**
 * Brevvo Email Provider implementation
 * https://developers.brevo.com/docs
 */
@Injectable()
export class BrevvoEmailProvider implements IEmailProvider {
  constructor(protected apiKey: string) {}

  async sendEmail({
    to,
    subject,
    body,
  }: {
    to: string;
    subject: string;
    body: string;
  }): Promise<void> {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        'api-key': this.apiKey,
      },
      body: JSON.stringify({
        sender: {
          email: emailConfig.senderEmail,
          name: emailConfig.senderName,
        },
        to: [{ email: to }],
        subject,
        htmlContent: body,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to send email: ${response.statusText}`);
    }
  }
}
