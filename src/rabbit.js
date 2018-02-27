import amqp from 'amqp'
import log from './logger';

const { RABBIT_HOST, RABBIT_USER, RABBIT_PASSWORD } = process.env;
const rabbit = amqp.createConnection({
	host: RABBIT_HOST,
	login: RABBIT_USER,
	password: RABBIT_PASSWORD
});

rabbit.on('error', e => log.error(`Error from AMQP on RabbitMQ host: ${RABBIT_HOST}`, e));

export default rabbit;
