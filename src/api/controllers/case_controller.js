
import faker from 'faker';
import {Case} from '../models';
import rabbit from '../../rabbit';
import log from '../../logger';

let exchange;
const toBool = val => val == 'true';
const {
  RABBIT_EXCHANGE='',
  RABBIT_EXCHANGE_TYPE='',
  RABBIT_EXCHANGE_DURABLE,
  RABBIT_EXCHANGE_CONFIRM,
  RABBIT_EXCHANGE_AUTODELETE,
  BIND_KEY=''
} = process.env;

rabbit.on('ready', () => {
  log.info('Logging API is connected to RabbitMQ instance');
  exchange = rabbit.exchange(RABBIT_EXCHANGE, {
    type: RABBIT_EXCHANGE_TYPE,
    durable: toBool(RABBIT_EXCHANGE_DURABLE),
    confirm: toBool(RABBIT_EXCHANGE_CONFIRM),
    autoDelete: toBool(RABBIT_EXCHANGE_AUTODELETE)
  });
});


class CaseController {
  create(req, res) {
    Case.create({})
      .then(cs => res.status(200).json(cs))
      .then(err => res.status(500).json({success: false, err}))
  }
  findAll(req, res){
    Case.find()
      .then(cases => res.status(200).json(cases))
      .catch(err => res.status(500).json({success: false, err}));
  }
  detect(req, res) {
    const {body} = req;
    log.info(`Queueing payload for processing`);
      try {
        if (exchange) {
          exchange.publish(BIND_KEY, body, {/*correlationId: req.correlationId()*/}, (failed) => {
            failed
              && log.error('Message failed to successfully publish to RabbitMQ')
              || log.info('Message was successfully published to RabbitMQ');

            return res.json({success: !failed, payload: body});
          });
        } else {
          return res.status(500).json({success: false, message: "Service is not connected to RabbitMQ exchange.", body});
        }
      } catch (err) {
        log.error(err)
        return res.status(500).json({success: false, message: "Service failed to publish message to RabbitMQ exchange.", body});
      }
  }
}

export default new CaseController();
