import express, { Express, Request, Response } from "express";
import stompit from "stompit";

const app: Express = express();
const port = 4000;

// Configure connection to ActiveMQ broker
const connectOptions = {
  host: 'localhost',
  port: 61613,
  connectHeaders: {
    host: '/'
  }
};

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
  
  stompit.connect(connectOptions, (error, client) => {
    if (error) {
      console.error('Connection error:', error.message);
      return;
    }

    console.log('Connected to ActiveMQ broker');

    // Send a message
    const sendHeaders = {
      'destination': '/queue/test',
      'content-type': 'text/plain'
    };

    const frame = client.send(sendHeaders);
    frame.write('Hello, ActiveMQ!');
    frame.end();
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});