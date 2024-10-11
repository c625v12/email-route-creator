export interface ZoneResult {
  account: {
    id: string;
    name: string;
  };
  activated_on: string;
  created_on: string;
  development_mode: number;
  id: string;
  meta: {
    cdn_only: boolean;
    custom_certificate_quota: number;
    dns_only: boolean;
    foundation_dns: boolean;
    page_rule_quota: number;
    phishing_detected: boolean;
    step: number;
  };
  modified_on: string;
  name: string;
  original_dnshost: string;
  original_name_servers: string[];
  original_registrar: string;
  owner: {
    id: string;
    name: string;
    type: string;
  };
  vanity_name_servers: string[];
}

export interface Zone {
  errors: [];
  messages: [];
  success: boolean;
  result: ZoneResult;
}
