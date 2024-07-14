export interface MessagingProvider {
  sendMessage(message: string, to: string): Promise<void>;

  sendMenu(options: string[], to: string): Promise<void>;
}
