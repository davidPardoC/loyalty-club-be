export class WhatsappWebhookDto {
  object: string;
  entry: Entry[];
}

class Entry {
  id: string;
  changes: Changes[];
}

export class Changes {
  field: 'messages';
  value: Value;
}

class Value {
  messaging_product: string;
  metadata: { display_phone_number: string; phone_number_id: string };
  contacts: Contacts[];
  messages: Messages[];
}

class Contacts {
  profile: {
    name: string;
  };
  wa_id: string;
}

class Messages {
  from: string;
  id: string;
  timestamp: string;
  text: {
    body: string;
  };
  type: 'text';
}
