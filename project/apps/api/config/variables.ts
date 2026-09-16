import 'dotenv/config';

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
export const connectionString = `postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?schema=public`;

const { SENDER_EMAIL, SENDER_NAME, EMAIL_PROVIDER, BREVVO_API_KEY } =
  process.env;

export const emailConfig = {
  senderEmail: SENDER_EMAIL,
  senderName: SENDER_NAME,
  emailProvider: EMAIL_PROVIDER,
  brevvoApiKey: BREVVO_API_KEY,
};

const { FRONTEND_STUDENT_URL, FRONTEND_MASTER_URL } = process.env;

export const frontendConfig = {
  studentUrl: FRONTEND_STUDENT_URL,
  masterUrl: FRONTEND_MASTER_URL,
};
