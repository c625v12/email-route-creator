package models

type Account struct {
	ID   string `json:"id"`
	Name string `json:"name"`
}

type Meta struct {
	CDNOnly                bool `json:"cdn_only"`
	CustomCertificateQuota int  `json:"custom_certificate_quota"`
	DNSOnly                bool `json:"dns_only"`
	FoundationDNS          bool `json:"foundation_dns"`
	PageRuleQuota          int  `json:"page_rule_quota"`
	PhishingDetected       bool `json:"phishing_detected"`
	Step                   int  `json:"step"`
}

type Owner struct {
	ID   string `json:"id"`
	Name string `json:"name"`
	Type string `json:"type"`
}

type ZoneResult struct {
	Account             Account  `json:"account"`
	ActivatedOn         string   `json:"activated_on"`
	CreatedOn           string   `json:"created_on"`
	DevelopmentMode     int      `json:"development_mode"`
	ID                  string   `json:"id"`
	Meta                Meta     `json:"meta"`
	ModifiedOn          string   `json:"modified_on"`
	Name                string   `json:"name"`
	OriginalDNSHost     string   `json:"original_dnshost"`
	OriginalNameServers []string `json:"original_name_servers"`
	OriginalRegistrar   string   `json:"original_registrar"`
	Owner               Owner    `json:"owner"`
	VanityNameServers   []string `json:"vanity_name_servers"`
}

type Zone struct {
	Errors   []interface{} `json:"errors"`
	Messages []interface{} `json:"messages"`
	Success  bool          `json:"success"`
	Result   ZoneResult    `json:"result"`
}
