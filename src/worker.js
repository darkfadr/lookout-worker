import axios from 'axios';
import express from 'express'
import rabbit from './rabbit';
import log from './logger';

const app = express();
const conneted = false;

const {PORT=3000, BIND_KEY='', PLATE_API: baseURL } = process.env;
const ai = axios.create({baseURL, timeout: 150000});

rabbit.on('ready', () => {
  connected = true;
  console.log('Worker is connected to RabbitMQ')
  rabbit.queue('screenshot', function (q) {
      q.bind(BIND_KEY);
      // Receive messages
      q.subscribe(message => {
        log.debug('\n\nReceived: ', message)

        ai.post('/plate', message)
          .then(res => log.debug(res.data))
          .catch(err => log.error(`failed to parse message in queue`));
      });
  });
});


app.get('/', (req, res) => res.json({connected}));
app.listen(PORT, () => log.info('Worker is running on port: ', PORT));







