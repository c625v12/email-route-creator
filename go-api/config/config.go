package config

import (
	"os"
)

type APIConfig struct {
	BaseURL    string
	AuthHeader string
	ZoneId     string
	AccountId  string
}

func NewAPIConfig() *APIConfig {
	baseURL := "https://api.cloudflare.com/client/v4"
	return &APIConfig{
		BaseURL:    baseURL,
		AuthHeader: os.Getenv("apiKey"),
		ZoneId:     os.Getenv("zoneId"),
		AccountId:  os.Getenv("accountId"),
	}
}
