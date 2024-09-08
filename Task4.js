import express from 'express';
import fs from 'fs';
import { DateTime } from 'luxon';

const app = express();
const port = 3000;

// Define a route to handle POST requests
app.post('/submit-data', (req, res) => {
  // Access the data from the request body
  const { ledStatus } = req.body;

  // Validate the LED status
  if (ledStatus !== 'ledOff' && ledStatus !== 'ledOn') {
    return res.status(400).send('Invalid LED status');
  }

  // Write the LED status and timestamp to the log file
  const timestamp = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
  const logEntry = ${timestamp} - LED status: ${ledStatus}\n;
  fs.appendFile('led_status.log', logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
      return res.status(500).send('Error writing to log file');
    }
  });

  // Send a response indicating success
  res.send('Data received successfully');
});

app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(Server is running on port ${port});
});
