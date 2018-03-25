import axios from 'axios';
import rabbit from './rabbit';
import log from './logger';

const { BIND_KEY='', PLATE_API: baseURL } = process.env;
const plate = axios.create({baseURL, timeout: 150000});


rabbit.on('ready', () => {
  connection.queue('screenshot', function (q) {
      // Catch all messages
      q.bind(BIND_KEY);
      // Receive messages
      q.subscribe(message => {
        log.debug('\n\nReceived: ', message)

        plate.post('/detect', {})
          .then(res => log.debug(res.data))
          .catch(err => log.error(`faile dto parse message in queue`));
      });
  });
});





