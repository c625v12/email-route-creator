package main

import (
	"fmt"
	"log"
	"net/http"

	"go-api/api"

	"github.com/gorilla/mux"
)

func main() {

	router := mux.NewRouter()
	router.HandleFunc("/emails", api.GetEmails).Methods("GET")
	router.HandleFunc("/destination-emails", func(w http.ResponseWriter, r *http.Request) { api.GetDestinationEmails(w, r, &http.Client{}) }).Methods("GET")
	router.HandleFunc("/add-route/{email}/{destinationEmail}", func(w http.ResponseWriter, r *http.Request) {
		api.PostEmailRoute(w, r, &http.Client{})
	}).Methods("GET")
	handler := cors(router)
	fmt.Println("Server starting at :8080")
	if err := http.ListenAndServe(":8080", handler); err != nil {
		fmt.Println("Error starting server:", err)
	}

	log.Fatal(http.ListenAndServe(":8080", router))
}

// CORS middleware
func cors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:4200")            // Replace with your React app's origin
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")     // Add any custom headers you need
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS") // Specify allowed methods

		// Handle preflight requests
		if r.Method == http.MethodOptions {
			return
		}

		next.ServeHTTP(w, r)
	})
}

func yourHandler(w http.ResponseWriter, r *http.Request) {
	// Your API logic here
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Hello from Go API!"))
}
