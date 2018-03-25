import amqp from 'amqp'
import log from './logger';

const { RABBIT_HOST, RABBIT_USER, RABBIT_PASSWORD, RABBIT_VHOST } = process.env;
const rabbit = amqp.createConnection({
	host: RABBIT_HOST,
	login: RABBIT_USER,
	password: RABBIT_PASSWORD,
  vhost: RABBIT_VHOST
});

rabbit.on('error', e => log.error(`Error from AMQP on RabbitMQ host: ${RABBIT_HOST}`, e));

export default rabbit;
