package api

import (
	"encoding/json"
	"fmt"
	"go-api/config"
	"go-api/models"
	"go-api/utility"
	"io"
	"net/http"
	"time"
)

// GetEmails handles the HTTP request to fetch email routing rules.
func GetEmails(w http.ResponseWriter, r *http.Request) {
	httpClient := &http.Client{Timeout: 10 * time.Second}

	apiConfig := config.NewAPIConfig()
	url := fmt.Sprintf("%s/zones/%s/email/routing/rules", apiConfig.BaseURL, apiConfig.ZoneId)

	if url == "" {
		utility.ErrorLogger(w, nil, "Missing API URL", http.StatusInternalServerError)
		return
	}

	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		utility.ErrorLogger(w, err, "Failed to create request", http.StatusInternalServerError)
		return
	}

	// Set headers
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", apiConfig.AuthHeader))
	req.Header.Add("Content-Type", "application/json")

	queryParams := req.URL.Query()
	queryParams.Add("per_page", "200")
	req.URL.RawQuery = queryParams.Encode()

	resp, err := httpClient.Do(req)
	if err != nil {
		utility.ErrorLogger(w, err, "Failed to execute request", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		utility.ErrorLogger(w, nil, fmt.Sprintf("Unexpected status code: %d", resp.StatusCode), http.StatusInternalServerError)
		return
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		utility.ErrorLogger(w, err, "Failed to read response body", http.StatusInternalServerError)
		return
	}

	var apiResponse models.EmailRouteApiResponse
	if err := json.Unmarshal(body, &apiResponse); err != nil {
		utility.ErrorLogger(w, err, "Failed to parse response", http.StatusInternalServerError)
		return
	}

	// Map email routes and respond
	currentEmails := utility.MapEmailRoutes(apiResponse.Result)
	w.Header().Set("Content-Type", "application/json")
	utility.Logger(w, "Success", http.StatusAccepted)

	if err := json.NewEncoder(w).Encode(currentEmails); err != nil {
		utility.ErrorLogger(w, err, "Failed to encode response", http.StatusInternalServerError)
	}
}
