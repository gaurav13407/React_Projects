package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

// isPortAvailable checks if a port is available
func isPortAvailable(port int) bool {
	address := fmt.Sprintf(":%d", port)
	listener, err := net.Listen("tcp", address)
	if err != nil {
		return false
	}
	listener.Close()
	return true
}

// findAvailablePort finds the next available port starting from startPort
func findAvailablePort(startPort int) int {
	for port := startPort; port < startPort+100; port++ {
		if isPortAvailable(port) {
			return port
		}
	}
	log.Fatal("Could not find an available port")
	return -1
}

func main() {
	// Define the projects (ports will be assigned dynamically)
	projectNames := []string{
		"CollabNotes_Real_Time_Collaborative_Notes",
		"Designhub",
		"EduStream_Learning_Platform",
		"Medix_Patient_Portal",
		"Newsfleet_Real_Time_Newsroom_DashBoard",
		"Secure_Banking_Dashboard",
		"ShopEase_E-Commerce_Platform",
		"Smart_Portfolio_Dashboard",
		"StreamVision_Video_Dashboard",
		"TaskFlow_Project_Management",
	}

	// Dynamically assign available ports
	projects := make(map[string]int)
	currentPort := 3001
	
	for _, project := range projectNames {
		availablePort := findAvailablePort(currentPort)
		projects[project] = availablePort
		currentPort = availablePort + 1
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
