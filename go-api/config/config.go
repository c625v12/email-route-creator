package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

type APIConfig struct {
	BaseURL    string
	AuthHeader string
	ZoneId     string
	AccountId  string
}

func init() {
	err := godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file")
	}
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
