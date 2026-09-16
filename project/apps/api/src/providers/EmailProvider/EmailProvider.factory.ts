import { emailConfig } from 'config/variables';
import { BrevvoEmailProvider } from './methods/BrevvoEmailProvider';
import { IEmailProvider } from './interface/EmailProvider.interface';

enum EmailProviderEnum {
  BREVVO = 'brevvo',
}

export function EmailProviderFactory(
  provider?: EmailProviderEnum,
): IEmailProvider {
  provider =
    provider ?? (emailConfig.emailProvider?.toLowerCase() as EmailProviderEnum);

  switch (provider) {
    case EmailProviderEnum.BREVVO:
      if (!emailConfig.brevvoApiKey) {
        throw new Error('Brevvo API key is not configured');
      }
      return new BrevvoEmailProvider(emailConfig.brevvoApiKey);
    default:
      throw new Error(`Unsupported email provider: ${provider}`);
  }
}
