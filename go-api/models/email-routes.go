package models

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
}

type Action struct {
	Type  string   `json:"type"`
	Value []string `json:"value"`
}

type Matcher struct {
	Field string `json:"field"`
	Type  string `json:"type"`
	Value string `json:"value"`
}

type EmailRule struct {
	Actions  []Action  `json:"actions"`
	Enabled  bool      `json:"enabled"`
	Matchers []Matcher `json:"matchers"`
	Name     string    `json:"name"`
	Priority int       `json:"priority"`
	Tag      string    `json:"tag"`
}

type EmailRouteApiResponse struct {
	Result []EmailRule `json:"result"`
}

type EmailMapper struct{}
