export interface EmailParams {
  email: string;
  destination: string;
}

export interface actions {
  type: 'forward';
  value: string[];
}

export interface matchers {
  field: string;
  type: string;
  value: string;
}

export interface Emails {
  actions: actions[];
  enabled: boolean;
  matchers: matchers[];
  name: string;
  priority: number;
  tag: string;
}

export interface CloudflareEmails {
  result: Emails[];
}

export interface DestinationEmail {
  created: string;
  email: string;
  modified: string;
  tag: string;
  verified: string;
}

export interface CloudflareDestinationEmails {
  result: DestinationEmail[];
}
