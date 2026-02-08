package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func main() {
	// Define the projects and their ports
	projects := map[string]int{
		"CollabNotes_Real_Time_Collaborative_Notes": 3001,
		"Designhub":                                  3002,
		"EduStream_Learning_Platform":                3003,
		"Medix_Patient_Portal":                       3004,
		"Newsfleet_Real_Time_Newsroom_DashBoard":     3005,
		"Secure_Banking_Dashboard":                   3006,
		"ShopEase_E-Commerce_Platform":               3007,
		"Smart_Portfolio_Dashboard":                  3008,
		"StreamVision_Video_Dashboard":               3009,
		"TaskFlow_Project_Management":                3010,
	}

	// Get the directory where the executable is located
	exePath, err := os.Executable()
	if err != nil {
		log.Fatal("Error getting executable path:", err)
	}
	exeDir := filepath.Dir(exePath)

	// Start a server for each project
	for project, port := range projects {
		distPath := filepath.Join(exeDir, project)
		portStr := fmt.Sprintf(":%d", port)

		// Verify the project folder exists
		if _, err := os.Stat(distPath); os.IsNotExist(err) {
			log.Printf("⚠️  Warning: project folder not found for %s at %s\n", project, distPath)
			continue
		}

		go serveProject(project, distPath, portStr)
	}

	// Print the URLs
	fmt.Println("\n" + strings.Repeat("=", 60))
	fmt.Println("🚀 All Projects Running!")
	fmt.Println(strings.Repeat("=", 60) + "\n")

	for project, port := range projects {
		fmt.Printf("✅ %s\n   http://localhost:%d\n\n", project, port)
	}

	fmt.Println(strings.Repeat("=", 60))
	fmt.Println("Press Ctrl+C to stop the server")
	fmt.Println(strings.Repeat("=", 60) + "\n")

	// Keep the main thread alive
	select {}
}

func serveProject(projectName, distPath, port string) {
	// Create a file server for the dist directory
	fs := http.FileServer(http.Dir(distPath))

	// Create a handler that serves files or defaults to index.html for SPA routing
	handler := http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		path := filepath.Join(distPath, r.URL.Path)

		// Check if the file exists
		if _, err := os.Stat(path); os.IsNotExist(err) {
			// If it doesn't exist and it's not a file with an extension, serve index.html
			if !strings.Contains(filepath.Base(path), ".") {
				r.URL.Path = "/"
			}
		}

		fs.ServeHTTP(w, r)
	})

	http.Handle("/"+projectName+"/", http.StripPrefix("/"+projectName, handler))

	// Also serve directly from the root if it's on its own port
	mux := http.NewServeMux()
	mux.Handle("/", handler)

	// Start the server
	log.Printf("Starting %s on http://localhost%s\n", projectName, port)
	if err := http.ListenAndServe(port, mux); err != nil {
		log.Printf("Error starting server for %s: %v\n", projectName, err)
	}
}
