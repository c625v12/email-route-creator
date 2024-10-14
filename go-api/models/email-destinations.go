package models

type DestinationEmail struct {
	Created  string `json:"created"`
	Email    string `json:"email"`
	Modified string `json:"modified"`
	Tag      string `json:"tag"`
	Verified string `json:"verified"`
}

type CloudflareDestinationEmails struct {
	Result []DestinationEmail `json:"result"`
}
