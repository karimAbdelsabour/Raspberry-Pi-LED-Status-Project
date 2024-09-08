import express from 'express';
import fs from 'fs/promises';  
import { DateTime } from 'luxon';

var app = express();
var port = 3001;

app.use(express.json());

app.post('/data', async (req, res) => {
  var { ledStatus } = req.body;

  if (ledStatus !== 'ledOff' && ledStatus !== 'ledOn') {
    return res.status(400).send('Invalid LED status');
  }

  try {
    const timestamp = DateTime.now().toFormat('yyyy-MM-dd HH:mm:ss');
    const logEntry = `${timestamp} - LED status: ${ledStatus}\n`;
    await fs.appendFile('led_status.log', logEntry);
    res.send('Data received successfully');
  } catch (err) {
    console.error('Error writing to log file:', err);
    res.status(500).send('Error writing to log file');
  }
});

app.get('/', (req, res) => {
  res.send('Hello to Karim server for Led status!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

