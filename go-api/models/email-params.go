package models

type EmailPostBody struct {
	Actions  []Action  `json:"actions"`
	Enabled  bool      `json:"enabled"`
	Matchers []Matcher `json:"matchers"`
	Name     string    `json:"name"`
	Priority int       `json:"priority"`
}

type EmailParams struct {
	Destination string
	Email       string
}
