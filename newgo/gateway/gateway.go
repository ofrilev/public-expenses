package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"gateway/consts"
	"gateway/middlewares"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

func main() {
	// Get environment variables with defaults
	defaultHost := getEnvOrDefault("HOST", "0.0.0.0")
	defaultPort := getEnvOrDefault("PORT", "8080")
	defaultAuthPath := getEnvOrDefault("AUTH_FILE_PATH", "/static/authentication")
	defaultAppPath := getEnvOrDefault("APP_FILE_PATH", "/static/client")

	// Check if we're in development mode
	devMode, _ := strconv.ParseBool(getEnvOrDefault("DEV_MODE", "false"))
	clientDevURL := getEnvOrDefault("CLIENT_DEV_URL", "http://expensify:5173")
	authDevURL := getEnvOrDefault("AUTH_DEV_URL", "http://expensify:5174")

	// Define command line flags
	hostFlag := flag.String("host", defaultHost, "Host to listen on")
	portFlag := flag.String("port", defaultPort, "Port to serve on")
	authPathFlag := flag.String("auth-path", defaultAuthPath, "Path to authentication static files")
	appPathFlag := flag.String("app-path", defaultAppPath, "Path to client app static files")
	devModeFlag := flag.Bool("dev", devMode, "Run in development mode")
	flag.Parse()

	// Use values from flags
	host := *hostFlag
	port := *portFlag
	authFilePath := *authPathFlag
	appFilePath := *appPathFlag
	devMode = *devModeFlag

	// Log configuration
	log.Printf("Starting gateway with configuration:")
	log.Printf("  Host: %s", host)
	log.Printf("  Port: %s", port)
	log.Printf("  Development Mode: %v", devMode)
	log.Printf("  API Service URL: %s", consts.ApiServiceURL)
	log.Printf("  Auth Service URL: %s", consts.AuthServiceURL)

	if devMode {
		log.Printf("  Client Dev URL: %s", clientDevURL)
		log.Printf("  Auth Dev URL: %s", authDevURL)

		// In dev mode, set up proxy handlers for frontend apps
		http.Handle("/app/", middlewares.IsAuthenticated(proxyHandler(clientDevURL)))
		http.Handle("/auth/", proxyHandler(authDevURL))
	} else {
		// In production mode, verify paths and serve static files
		verifyPath(authFilePath, "Authentication")
		verifyPath(appFilePath, "Application")

		log.Printf("  Auth Files: %s", authFilePath)
		log.Printf("  App Files: %s", appFilePath)

		http.Handle("/auth/", staticFileHandler("/auth/", authFilePath))
		http.Handle("/app/", middlewares.CORSMiddleware(middlewares.IsAuthenticated(staticFileHandler("/app/", appFilePath))))
	}

	// API routes are the same in both modes
	http.Handle("/v1/api/", middlewares.CORSMiddleware(middlewares.AddUserContextToReq(http.StripPrefix("/v1/api", proxyHandler(consts.ApiServiceURL)))))
	http.Handle("/auth/api/", http.StripPrefix("/auth/api", proxyHandler(consts.AuthServiceURL)))

	// Add health/diagnostic endpoint
	http.HandleFunc("/health", healthCheckHandler(authFilePath, appFilePath, devMode, clientDevURL, authDevURL))

	// Start server
	serverAddr := fmt.Sprintf("%s:%s", host, port)
	log.Printf("Gateway running on %s", serverAddr)
	log.Fatal(http.ListenAndServe(serverAddr, nil))
}

// getEnvOrDefault retrieves an environment variable or returns a default if not set
func getEnvOrDefault(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists && value != "" {
		return value
	}
	return defaultValue
}

// verifyPath ensures a directory exists, logs it, and lists its contents
func verifyPath(path string, label string) {
	if path == "" {
		log.Printf("WARNING: %s directory path is empty", label)
		return
	}

	info, err := os.Stat(path)
	if os.IsNotExist(err) {
		log.Printf("WARNING: %s directory does not exist: %s", label, path)
		return
	} else if !info.IsDir() {
		log.Printf("WARNING: %s path exists but is not a directory: %s", label, path)
		return
	}

	log.Printf("%s directory exists: %s", label, path)

	// List directory contents
	files, err := os.ReadDir(path)
	if err != nil {
		log.Printf("ERROR: Cannot read directory %s: %v", path, err)
		return
	}

	if len(files) == 0 {
		log.Printf("WARNING: %s directory is empty: %s", label, path)
		return
	}

	log.Printf("%s directory contains %d items:", label, len(files))
	for i, file := range files {
		if i < 10 { // Only show first 10 files to avoid log flooding
			fileInfo, _ := file.Info()
			if fileInfo != nil {
				log.Printf("  - %s (%d bytes)", file.Name(), fileInfo.Size())
			} else {
				log.Printf("  - %s", file.Name())
			}
		}
	}
	if len(files) > 10 {
		log.Printf("  ... and %d more items", len(files)-10)
	}

	// Check specifically for index.html
	indexPath := filepath.Join(path, "index.html")
	if _, err := os.Stat(indexPath); os.IsNotExist(err) {
		log.Printf("WARNING: index.html not found in %s directory", label)
	} else {
		log.Printf("index.html found in %s directory", label)
	}
}

// ProxyHandler proxies requests to the target service
func proxyHandler(target string) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        // Add CORS headers immediately for OPTIONS requests
        if r.Method == "OPTIONS" {
            middlewares.AddCORSHeaders(w, r)
            w.WriteHeader(http.StatusOK)
            return
        }
        
        targetURL, err := url.Parse(target)
        if err != nil {
            http.Error(w, "Invalid target URL", http.StatusInternalServerError)
            return
        }
        
        proxy := httputil.NewSingleHostReverseProxy(targetURL)
        
        // Capture the existing director
        originalDirector := proxy.Director
        
        // Create a modified director that preserves headers
        proxy.Director = func(req *http.Request) {
            // Call the original director
            originalDirector(req)
            
            // Log the headers for debugging
            log.Printf("Proxying request: %s %s -> %s", req.Method, req.URL.Path, req.URL.String())
        }
        
        // Add a response modifier to add CORS headers to the response
        proxy.ModifyResponse = func(resp *http.Response) error {
            // Add CORS headers to the proxy response
            resp.Header.Set("Access-Control-Allow-Origin", r.Header.Get("Origin"))
            resp.Header.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH")
            resp.Header.Set("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, X-CSRF-Token")
            resp.Header.Set("Access-Control-Allow-Credentials", "true")
            resp.Header.Set("Access-Control-Max-Age", "3600")
            return nil
        }
        
        // Custom error handler
        proxy.ErrorHandler = func(w http.ResponseWriter, r *http.Request, err error) {
            middlewares.AddCORSHeaders(w, r)
            log.Printf("Error proxying request to %s: %v", target, err)
            http.Error(w, "Service unavailable", http.StatusBadGateway)
        }
        
        proxy.ServeHTTP(w, r)
    }
}

func staticFileHandler(prefix string, root string) http.HandlerFunc {
	fs := http.FileServer(http.Dir(root)) // Static file server
	return func(w http.ResponseWriter, r *http.Request) {
		// Strip the prefix to get the relative file path
		relativePath := r.URL.Path[len(prefix):]
		filePath := filepath.Join(root, relativePath)

		// Check if the request matches a static file
		if _, err := os.Stat(filePath); os.IsNotExist(err) {
			// Log the error
			log.Printf("File %s not found, serving index.html", filePath)
			// Fallback only for non-asset paths
			if !isStaticAsset(relativePath) {
				indexPath := filepath.Join(root, "index.html")
				if _, err := os.Stat(indexPath); os.IsNotExist(err) {
					log.Printf("ERROR: index.html not found at %s", indexPath)
					http.Error(w, "Not Found", http.StatusNotFound)
					return
				}
				http.ServeFile(w, r, indexPath)
				return
			}
		}

		// Serve the static file if it exists
		http.StripPrefix(prefix, fs).ServeHTTP(w, r)
	}
}

// isStaticAsset checks if the requested path is for a static asset
func isStaticAsset(path string) bool {
	staticExtensions := []string{".js", ".css", ".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".ico", ".woff", ".woff2", ".ttf", ".eot"}
	for _, ext := range staticExtensions {
		if len(path) > len(ext) && path[len(path)-len(ext):] == ext {
			return true
		}
	}
	return false
}

// healthCheckHandler provides diagnostic information about the static files
func healthCheckHandler(authPath, appPath string, devMode bool, clientDevURL, authDevURL string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		type FileInfo struct {
			Name string `json:"name"`
			Size int64  `json:"size"`
			Path string `json:"path"`
		}

		type DirInfo struct {
			Path      string     `json:"path"`
			Exists    bool       `json:"exists"`
			FileCount int        `json:"fileCount"`
			Files     []FileInfo `json:"files,omitempty"`
		}

		type DevInfo struct {
			Enabled      bool   `json:"enabled"`
			ClientDevURL string `json:"clientDevUrl,omitempty"`
			AuthDevURL   string `json:"authDevUrl,omitempty"`
		}

		type HealthInfo struct {
			Status      string            `json:"status"`
			AuthDir     DirInfo           `json:"authDir,omitempty"`
			AppDir      DirInfo           `json:"appDir,omitempty"`
			DevMode     DevInfo           `json:"devMode"`
			Environment map[string]string `json:"environment"`
		}

		getDirInfo := func(path string) DirInfo {
			info := DirInfo{
				Path:   path,
				Exists: false,
			}

			if path == "" {
				return info
			}

			_, err := os.Stat(path)
			if os.IsNotExist(err) {
				return info
			}

			info.Exists = true
			files, err := os.ReadDir(path)
			if err != nil {
				return info
			}

			info.FileCount = len(files)
			info.Files = make([]FileInfo, 0)

			// Only include first 20 files to avoid response being too large
			maxFiles := 20
			if len(files) < maxFiles {
				maxFiles = len(files)
			}

			for i := 0; i < maxFiles; i++ {
				fileInfo, err := files[i].Info()
				if err != nil {
					continue
				}

				info.Files = append(info.Files, FileInfo{
					Name: fileInfo.Name(),
					Size: fileInfo.Size(),
					Path: filepath.Join(path, fileInfo.Name()),
				})
			}

			return info
		}

		// Get environment variables
		env := make(map[string]string)
		for _, e := range os.Environ() {
			pair := strings.SplitN(e, "=", 2)
			if len(pair) == 2 {
				// Only include relevant environment variables
				key := pair[0]
				if strings.Contains(key, "PATH") ||
					strings.Contains(key, "SERVICE") ||
					strings.Contains(key, "DEV_") ||
					strings.Contains(key, "PORT") ||
					strings.Contains(key, "HOST") {
					env[key] = pair[1]
				}
			}
		}

		health := HealthInfo{
			Status: "up",
			DevMode: DevInfo{
				Enabled: devMode,
			},
			Environment: env,
		}

		// Add dev mode info if enabled
		if devMode {
			health.DevMode.ClientDevURL = clientDevURL
			health.DevMode.AuthDevURL = authDevURL
		} else {
			// Only include directory info if not in dev mode
			health.AuthDir = getDirInfo(authPath)
			health.AppDir = getDirInfo(appPath)

			if !health.AuthDir.Exists || !health.AppDir.Exists {
				health.Status = "degraded"
				w.WriteHeader(http.StatusServiceUnavailable)
			}
		}

		json.NewEncoder(w).Encode(health)
	}
}
