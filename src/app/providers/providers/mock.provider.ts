import { MessagingProvider } from '../interfaces/messaging-provider.interface';

export class MockProvider implements MessagingProvider {
  async sendMessage(message: string, to: string): Promise<void> {
    console.log(`Sending message: ${message} to: ${to}`);
  }

  async sendMenu(options: string[], to: string): Promise<void> {
    console.log(`Sending menu: ${options} to: ${to}`);
  }
}
