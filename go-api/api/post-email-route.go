package api

import (
	"bytes"
	"encoding/json"
	"fmt"
	"go-api/config"
	"go-api/models"
	"go-api/utility"
	"net/http"

	"github.com/gorilla/mux"
)

// GetEmails handles the HTTP request to fetch email routing rules.
func PostEmailRoute(w http.ResponseWriter, r *http.Request, httpClient *http.Client) {

	vars := mux.Vars(r)
	email := vars["email"]
	destinationEmail := vars["destinationEmail"]

	apiConfig := config.NewAPIConfig()
	url := fmt.Sprintf("%s/zones/%s/email/routing/rules", apiConfig.BaseURL, apiConfig.ZoneId)

	if url == "" {
		utility.ErrorLogger(w, nil, "Missing API URL", http.StatusInternalServerError)
		return
	}

	requestBody, err := json.Marshal(utility.MapEmailPostBody(models.EmailParams{Destination: destinationEmail, Email: email}))

	if err != nil {
		fmt.Println("Error marshaling JSON:", err)
		return
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBody))
	if err != nil {
		utility.ErrorLogger(w, err, "Failed to create request", http.StatusInternalServerError)
		return
	}

	// Set headers
	req.Header.Add("Authorization", fmt.Sprintf("Bearer %s", apiConfig.AuthHeader))
	req.Header.Add("Content-Type", "application/json")

	resp, err := httpClient.Do(req)
	if err != nil {
		utility.ErrorLogger(w, err, "Failed to execute request", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

}
