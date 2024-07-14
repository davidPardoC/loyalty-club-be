import { ProvidersEnum } from '../constants/provider.enum';
import { MockProvider } from '../providers/mock.provider';
import { TelegramProvider } from '../providers/telegram.provider';

class ProvidersFactory {
  providers = {
    [ProvidersEnum.MOCK]: MockProvider,
    [ProvidersEnum.TELEGRAM]: TelegramProvider,
  };

  getProvider(provider: ProvidersEnum) {
    const Provider = this.providers[provider];
    if (!Provider) {
      throw new Error(`Provider ${provider} not found`);
    }
    return new Provider();
  }
}

export const messagingProvidersFactory = new ProvidersFactory();
