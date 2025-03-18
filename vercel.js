{
    "build": {
      "env": {
        "VITE_PROXY_TARGET": "https://cdn.jsdelivr.net" // Proxy target for your API
      }
    },
    "routes": [
      {
        "src": "/api/(.*)",
        "dest": "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/$1" // Proxy API requests
      },
      {
        "src": "/(.*)",
        "dest": "/" // Handle client-side routing
      }
    ]
  }