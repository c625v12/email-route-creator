package utility

import "go-api/models"

func MapEmailPostBody(params models.EmailParams) models.EmailPostBody {
	return models.EmailPostBody{
		Actions: []models.Action{
			{
				Type:  "forward",
				Value: []string{params.Destination},
			},
		},
		Enabled: true,
		Matchers: []models.Matcher{
			{
				Field: "to",
				Type:  "literal",
				Value: params.Email,
			},
		},
		Name:     "Send to user@example.net rule.",
		Priority: 0,
	}
}

// mapEmailRoutes maps email routing rules to a list of email addresses.
func MapEmailRoutes(emails []models.EmailRule) []string {
	currentEmails := make([]string, 0, len(emails))
	for _, email := range emails {
		if len(email.Matchers) > 0 {
			currentEmails = append(currentEmails, email.Matchers[0].Value)
		}
	}
	return currentEmails
}

func MapDestinationEmailRoutes(destEmails []models.DestinationEmail) []string {
	currentDestEmails := make([]string, 0, len(destEmails))
	for _, email := range destEmails {
		currentDestEmails = append(currentDestEmails, email.Email)
	}
	return currentDestEmails
}
