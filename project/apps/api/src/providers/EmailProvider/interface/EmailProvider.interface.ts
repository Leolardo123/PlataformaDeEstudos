export interface ISendEmailParams {
  to: string;
  subject: string;
  body: string;
}

export interface IEmailProvider {
  sendEmail(options: ISendEmailParams): Promise<void>;
}
