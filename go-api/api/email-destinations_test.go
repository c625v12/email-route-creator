package api

import (
	"bytes"
	"errors"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

// MockRoundTripper mocks the HTTP client's RoundTripper for simulating responses.
type MockRoundTripper struct {
	Response *http.Response
	Error    error
}

// RoundTrip implements the RoundTripper interface to mock HTTP responses.
func (m *MockRoundTripper) RoundTrip(req *http.Request) (*http.Response, error) {
	return m.Response, m.Error
}

func TestGetDestinationEmails(t *testing.T) {

	os.Setenv("apiKey", "testApiKey")
	os.Setenv("zoneId", "testZoneId")
	os.Setenv("accountId", "testAccountId")

	// Set up different test cases
	tests := []struct {
		name           string
		mockResponse   *http.Response
		mockError      error
		expectedStatus int
		expectedLog    string
	}{
		{
			name: "Success Case",
			mockResponse: &http.Response{
				StatusCode: http.StatusOK,
				Body:       io.NopCloser(bytes.NewBufferString(`{"result": [{"email": "test@example.com"}]}`)),
			},
			expectedStatus: http.StatusOK,
		},
		{
			name:           "Network Error",
			mockResponse:   nil,
			mockError:      errors.New("network error"),
			expectedStatus: http.StatusInternalServerError,
			expectedLog:    "Failed to execute request",
		},
		{
			name: "Non-200 Status Code",
			mockResponse: &http.Response{
				StatusCode: http.StatusBadRequest,
				Body:       io.NopCloser(bytes.NewBufferString(``)),
			},
			expectedStatus: http.StatusInternalServerError,
			expectedLog:    "Unexpected status code: 400",
		},
		{
			name: "Invalid JSON Response",
			mockResponse: &http.Response{
				StatusCode: http.StatusOK,
				Body:       io.NopCloser(bytes.NewBufferString(`invalid json`)),
			},
			expectedStatus: http.StatusInternalServerError,
			expectedLog:    "Failed to parse response",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Create a mock HTTP client with our MockRoundTripper
			mockClient := &http.Client{
				Transport: &MockRoundTripper{
					Response: tt.mockResponse,
					Error:    tt.mockError,
				},
				Timeout: 10 * time.Second,
			}

			// Create a mock response writer using httptest
			rr := httptest.NewRecorder()
			req := httptest.NewRequest("GET", "/email/routing/addresses", nil)

			// Override the config and HTTP client in your function (inject dependencies)
			httpClient := mockClient

			// Call the function under test
			GetDestinationEmails(rr, req, httpClient)

			// Assert the expected status code
			assert.Equal(t, tt.expectedStatus, rr.Code)

			// Optionally, you can verify logs or response data based on your utility methods.
			// Example (assuming utility.Logger logs the output):
			bodyBytes, _ := io.ReadAll(rr.Body)
			assert.Contains(t, string(bodyBytes), tt.expectedLog)
		})
	}
}
