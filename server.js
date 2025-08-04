const express = require('express');
const cors = require('cors');  // Add this line
const https = require('https');
const http = require('http');

const app = express(); // Initialize express app

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing for express
app.options('*', cors()); // Enable preflight requests for all routes


// Proxy endpoint
app.post('/api/proxy', (req, res) => {
  // Extract the URL from the request body
  const apiUrl = req.body.url;

  // Validate the URL
  if (!apiUrl) {
    return res.status(400).send('URL is required');
  }

  // Parse the API URL to decide if HTTP or HTTPS module will be used
  const parsedUrl = new URL(apiUrl);

  const httpModule = parsedUrl.protocol === 'http:' ? http : https;

  // Forward the request to the actual API
  const apiReq = httpModule.request(apiUrl, (apiRes) => {
    let data = '';

    // Assemble data chunks from API response
    apiRes.on('data', (chunk) => {
      data += chunk;
    });

    // Once all data is received, send it back to the client
    apiRes.on('end', () => {
      res.send(data);
    });
  });

  // Handle API request errors (timeout, DNS errors, etc.)
  apiReq.on('error', (error) => {
    res.status(500).send(error.message);
  });

  // End the API request
  apiReq.end();
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
