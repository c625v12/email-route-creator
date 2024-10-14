package utility

import (
	"log"
	"net/http"
)

func ErrorLogger(w http.ResponseWriter, err error, message string, statusCode int) {
	log.Printf("Error: %v - %s", err, message)
	http.Error(w, message, statusCode)

}

func Logger(w http.ResponseWriter, message string, statusCode int) {
	log.Printf("Log: %s with status code: %v", message, statusCode)

}
